import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { getMacAddress } from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ICourse {
  id: string;
  name: string;
  image: string;
}

interface IFavoritesContext {
  favoriteCourses: Array<ICourse>;
  addFavoriteCourse(course: ICourse): Promise<void>;
  removeFavoriteCourse(courseId: string): Promise<void>;
}

const FavoriteCoursesContext = createContext<IFavoritesContext>(
  {} as IFavoritesContext,
);

export const FavoriteCoursesProvider: React.FC = ({ children }) => {
  const [courses, setCourses] = useState<Array<ICourse>>([]);

  useEffect(() => {
    async function loadCourses() {
      const macAddress = await getMacAddress();

      const asyncStorageData = await AsyncStorage.getItem(
        `${macAddress}-favorite-courses`,
      );

      if (asyncStorageData) {
        const parsedAsyncStorageData = JSON.parse(asyncStorageData) as {
          courses: Array<ICourse>;
        };

        setCourses(parsedAsyncStorageData.courses);
        return;
      }

      setCourses([]);
    }

    loadCourses();
  }, []);

  const addFavoriteCourse = useCallback(
    async (course: ICourse): Promise<void> => {
      const macAddress = await getMacAddress();
      const oldStoragedData = await AsyncStorage.getItem(
        `${macAddress}-favorite-courses`,
      );

      if (oldStoragedData) {
        const parsedStoragedData = JSON.parse(oldStoragedData) as {
          courses: Array<ICourse>;
        };

        parsedStoragedData.courses.push(course);

        await AsyncStorage.removeItem(`${macAddress}-favorite-courses`);
        await AsyncStorage.setItem(
          `${macAddress}-favorite-courses`,
          JSON.stringify({ courses: parsedStoragedData.courses }),
        );

        setCourses(parsedStoragedData.courses);
        return;
      }

      const dataToBeStoraged: Array<ICourse> = [];
      dataToBeStoraged.push(course);
      await AsyncStorage.setItem(
        `${macAddress}-favorite-courses`,
        JSON.stringify({ courses: dataToBeStoraged }),
      );

      setCourses(dataToBeStoraged);
    },
    [],
  );

  const removeFavoriteCourse = useCallback(async (courseId: string) => {
    const macAddress = await getMacAddress();
    const dataStoraged = await AsyncStorage.getItem(
      `${macAddress}-favorite-courses`,
    );

    if (!dataStoraged) {
      return;
    }

    const parsedDataStoraged = JSON.parse(dataStoraged) as {
      courses: Array<ICourse>;
    };

    const newDataToBeStoraged = parsedDataStoraged.courses.filter(
      course => course.id !== courseId,
    );

    await AsyncStorage.removeItem(`${macAddress}-favorite-courses`);
    await AsyncStorage.setItem(
      `${macAddress}-favorite-courses`,
      JSON.stringify({ courses: newDataToBeStoraged }),
    );

    setCourses(newDataToBeStoraged);
  }, []);

  return (
    <FavoriteCoursesContext.Provider
      value={{
        favoriteCourses: courses,
        addFavoriteCourse,
        removeFavoriteCourse,
      }}
    >
      {children}
    </FavoriteCoursesContext.Provider>
  );
};

export function useFavoriteCourses(): IFavoritesContext {
  const context = useContext(FavoriteCoursesContext);

  if (!context) {
    throw new Error('A provider must be set! (useFavoriteCourses)');
  }

  return context;
}
