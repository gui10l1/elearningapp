import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Image, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
// import YoutubePlayer from 'react-native-youtube-iframe';

import elearningLogo from '../../assets/elearninglogo.png';
import playerIcon from '../../assets/player.png';
import {
  Header,
  Container,
  Video,
  PlayerImage,
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

interface IRouteParams {
  id: string;
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
  const [lesson, setLesson] = useState<ILesson>();

  const { saveCompletedLesson } = useLessons();
  const { params } = useRoute();
  const { navigate } = useNavigation();
  const { id, lessonIndex: index, lessons } = params as IRouteParams;

  // Load lesson from API
  useEffect(() => {
    async function loadLesson() {
      const { data } = await api.get(`/lessons/${id}`);

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
  }, [id]);

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

  // Loading screen
  if (!lesson) {
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
          onPress={navigateToLessons}
        />
        <Image source={elearningLogo} />
        <Icon name="heart" color="#FF6680" size={24} />
      </Header>

      <Container>
        {/* <YoutubePlayer height={210} videoId="nPvuNsRccVw" /> */}
        <Video onPress={() => saveCompletedLesson(lesson.id, lesson.courseId)}>
          <PlayerImage source={playerIcon} />
        </Video>

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
