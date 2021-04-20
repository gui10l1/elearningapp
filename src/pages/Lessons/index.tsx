import React, { useCallback, useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import elearningLogo from '../../assets/elearninglogo.png';
import playerIcon from '../../assets/player.png';
import {
  Header,
  Container,
  ContainerHeader,
  ContainerHeaderText,
  CoursesQuantityText,
  LessonsList,
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
  name: string;
}

const Lessons: React.FC = () => {
  const [course, setCourse] = useState<ICourse>();
  const [lessons, setLessons] = useState<Array<ILesson>>();

  const { completedLessons: completed } = useLessons();
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const { id } = params as IParams;

  // Load lessons from API and filter which one is completed or not
  useEffect(() => {
    async function loadLessons() {
      const lessonsFiltered: ILesson[] = [];

      const { data } = await api.get<Array<IResponse>>(`/course-lessons/${id}`);
      const { data: courseFromApi } = await api.get(`courses/${id}`);
      const parsedResponse: IResponse[] = data.map(item => {
        return {
          completed: item.completed,
          course_id: item.course_id,
          duration: item.duration,
          id: item.id,
          name: item.name,
        };
      });

      const completedLessons = completed.filter(item => item.course_id === id);

      parsedResponse.map(item => {
        const find = completedLessons.find(
          anotherItem => anotherItem.id === item.id,
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
  }, [id, completed]);

  // Navigation to home screen
  const navigateToHome = useCallback(() => {
    navigate('Home');
  }, [navigate]);

  // Navigate to lesson screen
  const navigateToLesson = useCallback(
    (lessonId: string, lessonIndex: number, lessonsList: Array<ILesson>) => {
      navigate('Lesson', { id: lessonId, lessonIndex, lessons: lessonsList });
    },
    [navigate],
  );

  if (!lessons) {
    return <View />;
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
        <Icon name="heart" color="#FF6680" size={24} />
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
      </Container>
    </>
  );
};

export default Lessons;
