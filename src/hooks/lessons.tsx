import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import { getMacAddress } from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/elearningApi';

interface ILesson {
  id: string;
  name: string;
  duration: number;
  course_id: string;
  completed: boolean;
}

interface IAsyncStorageData {
  id: string;
  name: string;
  duration: number;
  course_id: string;
  completed: boolean;
}

interface ILessonsContext {
  completedLessons: Array<ILesson>;
  loading: boolean;
  saveCompletedLesson(lessonId: string, courseId: string): Promise<void>;
}

const LessonsContext = createContext<ILessonsContext>({} as ILessonsContext);

export const LessonsProvider: React.FC = ({ children }) => {
  const [completedLessons, setCompletedLessons] = useState<Array<ILesson>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLessons() {
      const macAddress = await getMacAddress();
      const asyncStorageData = await AsyncStorage.getItem(macAddress);

      if (!asyncStorageData) {
        return;
      }

      const parsedData = JSON.parse(asyncStorageData) as IAsyncStorageData[];

      const completedLessonsFromStorage = parsedData.filter(
        lesson => lesson.completed === true,
      );

      setCompletedLessons(completedLessonsFromStorage);
      setLoading(false);
    }

    loadLessons();
  }, []);

  const saveCompletedLesson = useCallback(
    async (lessonId: string, courseId: string) => {
      const macAddress = await getMacAddress();
      const oldData = await AsyncStorage.getItem(macAddress);
      const {
        data: { name, duration },
      } = await api.get(`/lessons/${lessonId}`);

      if (oldData) {
        const parsedOldData = JSON.parse(oldData) as IAsyncStorageData[];

        const findDuplicated = parsedOldData.find(
          lesson => lesson.id === lessonId,
        );

        if (findDuplicated) {
          return;
        }

        parsedOldData.push({
          name,
          duration,
          id: lessonId,
          course_id: courseId,
          completed: true,
        });
        await AsyncStorage.removeItem(macAddress);
        await AsyncStorage.setItem(macAddress, JSON.stringify(parsedOldData));
        setCompletedLessons(parsedOldData);
        return;
      }

      const asyncStorageData: IAsyncStorageData[] = [
        {
          name,
          duration,
          id: lessonId,
          course_id: courseId,
          completed: true,
        },
      ];

      const parsedData = JSON.stringify(asyncStorageData);
      await AsyncStorage.setItem(macAddress, parsedData);

      setCompletedLessons(asyncStorageData);
    },
    [],
  );

  return (
    <LessonsContext.Provider
      value={{ saveCompletedLesson, completedLessons, loading }}
    >
      {children}
    </LessonsContext.Provider>
  );
};

export function useLessons(): ILessonsContext {
  const context = useContext(LessonsContext);

  if (!context) {
    throw new Error('A provider must be set! (useLesson)');
  }

  return context;
}
