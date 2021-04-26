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

interface IState {
  courses: Array<ICourse>;
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
  const [courses, setCourses] = useState<IState>({} as IState);

  useEffect(() => {
    async function loadCourses() {
      const macAddress = await getMacAddress();

      const asyncStorageData = await AsyncStorage.getItem(
        `${macAddress}-favorite-courses`,
      );

      if (asyncStorageData) {
        const parsedAsyncStorageData = JSON.parse(
          asyncStorageData,
        ) as Array<ICourse>;

        setCourses({ courses: parsedAsyncStorageData });
      }

      setCourses({} as IState);
    }

    loadCourses();
  }, []);

  const addFavoriteCourse = useCallback(
    async (course: ICourse): Promise<void> => {
      return AsyncStorage.clear();
      const macAddress = await getMacAddress();
      const oldStoragedData = await AsyncStorage.getItem(
        `${macAddress}-favorite-courses`,
      );

      if (oldStoragedData) {
        const parsedStoragedData = JSON.parse(
          oldStoragedData,
        ) as Array<ICourse>;

        parsedStoragedData.push(course);

        await AsyncStorage.mergeItem(
          `${macAddress}-favorite-courses`,
          JSON.stringify({ courses: parsedStoragedData }),
        );

        setCourses({ courses: parsedStoragedData });
        return;
      }

      const dataToBeStoraged: Array<ICourse> = [];
      dataToBeStoraged.push(course);
      await AsyncStorage.setItem(
        `${macAddress}-favorite-courses`,
        JSON.stringify({ courses: dataToBeStoraged }),
      );

      setCourses({ courses: dataToBeStoraged });
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

    const parsedDataStoraged = JSON.parse(dataStoraged) as Array<ICourse>;

    const newDataToBeStoraged = parsedDataStoraged.filter(
      course => course.id !== courseId,
    );

    await AsyncStorage.mergeItem(
      `${macAddress}-favorite-courses`,
      JSON.stringify({ courses: newDataToBeStoraged }),
    );
  }, []);

  return (
    <FavoriteCoursesContext.Provider
      value={{
        favoriteCourses: courses.courses,
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
