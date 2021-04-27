import React, { useCallback, useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import elearningLogo from '../../assets/elearninglogo.png';
import playerIcon from '../../assets/player.png';
import {
  Header,
  Container,
  ContainerHeader,
  ContainerHeaderText,
  CoursesQuantityText,
  LessonsList,
  NoClassesFoundMessage,
  Lesson,
  ButtonPlayer,
  LessonContent,
  LessonTitle,
  LessonDescription,
  LessonDescriptionText,
  Duration,
  DurationText,
  Badge,
} from './styles';
import api from '../../services/elearningApi';
import { useLessons } from '../../hooks/lessons';
import { useFavoriteCourses } from '../../hooks/favorites';
import LoadingScreen from '../../components/LoadingScreen';

// Interfaces
interface IParams {
  id: string;
}

export interface ILesson {
  id: string;
  name: string;
  duration: number;
  completed: boolean;
}

interface IResponse extends ILesson {
  course_id: string;
}

interface ICourse {
  id: string;
  name: string;
  image: string;
}

const Lessons: React.FC = () => {
  // States
  const [isFavorite, setIsFavorite] = useState(false);
  const [course, setCourse] = useState<ICourse>();
  const [lessons, setLessons] = useState<Array<ILesson>>();

  // Hooks
  const { addFavoriteCourse, favoriteCourses } = useFavoriteCourses();
  const { completedLessons: completed } = useLessons();
  const { navigate } = useNavigation();
  const { params } = useRoute();

  // Route params
  const { id } = params as IParams;

  // Load lessons from API and filter which one is completed or not
  useEffect(() => {
    async function loadLessons() {
      const lessonsFiltered: ILesson[] = [];

      const { data } = await api.get<Array<IResponse>>(`/course-lessons/${id}`);
      const { data: courseFromApi } = await api.get(`courses/${id}`);

      if (favoriteCourses.length > 0) {
        const findCourse = favoriteCourses.find(
          item => item.id === courseFromApi.id,
        );

        setIsFavorite(!!findCourse);
      }

      const completedLessons = completed.filter(item => item.course_id === id);

      data.map(item => {
        const find = completedLessons.find(
          findCourse => findCourse.id === item.id,
        );

        if (find) {
          lessonsFiltered.push(find);
          return find;
        }

        lessonsFiltered.push(item);
        return item;
      });

      setLessons(lessonsFiltered);
      setCourse(courseFromApi);
    }

    loadLessons();
  }, [id, completed, favoriteCourses]);

  // Navigation to home screen
  const navigateToHome = useCallback(() => {
    navigate('Home');
  }, [navigate]);

  // Navigate to lesson screen
  const navigateToLesson = useCallback(
    (lessonId: string, lessonIndex: number, lessonsList: Array<ILesson>) => {
      navigate('Lesson', {
        id: lessonId,
        lessonIndex,
        lessons: lessonsList,
        course,
      });
    },
    [navigate, course],
  );

  // Loading
  if (!lessons || !course) {
    return <LoadingScreen />;
  }

  // Screen
  return (
    <>
      <Header>
        <Icon
          name="arrow-left"
          color="#FF6680"
          size={24}
          onPress={navigateToHome}
        />
        <Image source={elearningLogo} />
        <MaterialIcons
          name={isFavorite ? 'favorite' : 'favorite-border'}
          size={24}
          color="#FF6680"
          onPress={() => addFavoriteCourse(course)}
        />
      </Header>

      <Container>
        <ContainerHeader>
          <ContainerHeaderText>{course?.name}</ContainerHeaderText>
          <CoursesQuantityText>
            {lessons?.length === 1
              ? `${lessons.length} aula`
              : `${lessons?.length} aulas`}
          </CoursesQuantityText>
        </ContainerHeader>

        {lessons.length !== 0 ? (
          <LessonsList
            data={lessons}
            renderItem={({ item, index }) => {
              return (
                <Lesson>
                  <ButtonPlayer
                    isFinished={!!item.completed}
                    onPress={() => navigateToLesson(item.id, index, lessons)}
                  >
                    <Image source={playerIcon} />
                  </ButtonPlayer>

                  <LessonContent>
                    <LessonTitle>{item.name}</LessonTitle>

                    <LessonDescription>
                      <View style={{ flexDirection: 'row' }}>
                        <LessonDescriptionText>
                          Aula {index + 1}
                        </LessonDescriptionText>
                        <Duration>
                          <Icon name="clock" size={10} color="#C4C4D1" />
                          <DurationText>{item.duration / 60} min</DurationText>
                        </Duration>
                      </View>
                      {item.completed && <Badge>Completo!</Badge>}
                    </LessonDescription>
                  </LessonContent>
                </Lesson>
              );
            }}
          />
        ) : (
          <NoClassesFoundMessage>Nenhuma aula encontrada</NoClassesFoundMessage>
        )}
      </Container>
    </>
  );
};

export default Lessons;
