import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import YoutubePlayer from 'react-native-youtube-iframe';

import elearningLogo from '../../assets/elearninglogo.png';
import {
  Header,
  Container,
  Content,
  Title,
  LessonInfo,
  LessonName,
  Duration,
  DurationText,
  FiClock,
  Descripition,
  ButtonWrapper,
  BackButton,
  BackButtonText,
  ForwardButton,
  ForwardButtonText,
} from './styles';
import api from '../../services/elearningApi';
import { useLessons } from '../../hooks/lessons';
import { useFavoriteCourses } from '../../hooks/favorites';
import { ICourse } from '../Home';
import LoadingScreen from '../../components/LoadingScreen';

// Interfaces
interface IRouteParams {
  id: string;
  course: ICourse;
  lessonIndex: number;
  lessons: Array<ILesson>;
}

interface ILesson {
  id: string;
  name: string;
  videoId: string;
  courseId: string;
  description: string;
  duration: number;
}

const Lesson: React.FC = () => {
  // States
  const [isFavorite, setIsFavorite] = useState(false);
  const [lesson, setLesson] = useState<ILesson>();

  // Hooks
  const {
    addFavoriteCourse,
    favoriteCourses,
    removeFavoriteCourse,
  } = useFavoriteCourses();
  const { saveCompletedLesson } = useLessons();
  const { params } = useRoute();
  const { navigate } = useNavigation();

  // Route params
  const { id, lessonIndex: index, lessons, course } = params as IRouteParams;

  // Load lesson from API
  useEffect(() => {
    async function loadLesson() {
      const { data } = await api.get(`/lessons/${id}`);

      if (favoriteCourses.length > 0) {
        const findCourse = favoriteCourses.find(item => item.id === course.id);

        setIsFavorite(!!findCourse);
      }

      setLesson({
        description: data.description,
        duration: data.duration,
        id: data.id,
        name: data.name,
        videoId: data.video_id,
        courseId: data.course_id,
      });
    }

    loadLesson();
  }, [id, course, favoriteCourses]);

  // Navigate to lessons screen
  const navigateToLessons = useCallback(() => {
    navigate('Lessons');
  }, [navigate]);

  // Navigate to next/previous lesson
  const navigateToLesson = useCallback(
    (lessonId: string, lessonIndex: number, lessonsList: Array<ILesson>) => {
      navigate('Lesson', { id: lessonId, lessonIndex, lessons: lessonsList });
    },
    [navigate],
  );

  // Get previous lesson
  const previousLesson = useMemo<ILesson>(() => {
    return lessons[index - 1];
  }, [lessons, index]);

  // Get next lesson
  const nextLesson = useMemo<ILesson>(() => {
    return lessons[index + 1];
  }, [lessons, index]);

  const handleAddFinishedLesson = useCallback(
    (state: string) => {
      const lessonId = lesson?.id || 'id';
      const lessonCourseId = lesson?.courseId || 'id';

      if (state === 'ended') {
        saveCompletedLesson(lessonId, lessonCourseId);
      }
    },
    [lesson, saveCompletedLesson],
  );

  // Loading screen
  if (!lesson) {
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
          onPress={navigateToLessons}
        />
        <Image source={elearningLogo} />
        {isFavorite ? (
          <MaterialIcons
            name="favorite"
            size={24}
            color="#FF6680"
            onPress={() => addFavoriteCourse(course)}
          />
        ) : (
          <MaterialIcons
            name="favorite-border"
            size={24}
            color="#FF6680"
            onPress={() => removeFavoriteCourse(course.id)}
          />
        )}
      </Header>

      <Container>
        <YoutubePlayer
          height={210}
          videoId={lesson.videoId}
          onChangeState={handleAddFinishedLesson}
        />

        <Content>
          <Title>{lesson.name}</Title>

          <LessonInfo>
            <LessonName>Aula {index + 1}</LessonName>

            <Duration>
              <FiClock name="clock" size={14} />
              <DurationText>{lesson.duration / 60} min</DurationText>
            </Duration>
          </LessonInfo>

          <Descripition>{lesson.description}</Descripition>

          <ButtonWrapper>
            <BackButton
              enabled={!!previousLesson}
              onPress={() =>
                navigateToLesson(previousLesson.id, index - 1, lessons)
              }
            >
              <Icon
                name="arrow-left"
                size={20}
                color={previousLesson ? '#ff6680' : '#c4c4d1'}
              />
              <BackButtonText isEnabled={!!previousLesson}>
                Aula anterior
              </BackButtonText>
            </BackButton>

            <ForwardButton
              enabled={!!nextLesson}
              isEnabled={!!nextLesson}
              onPress={() =>
                navigateToLesson(nextLesson.id, index + 1, lessons)
              }
            >
              <ForwardButtonText>Próxima aula</ForwardButtonText>
              <Icon name="arrow-right" size={20} color="#fff" />
            </ForwardButton>
          </ButtonWrapper>
        </Content>
      </Container>
    </>
  );
};

export default Lesson;
