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

interface IParams {
  id: string;
}

export interface ILesson {
  id: string;
  name: string;
  description: string;
  duration: number;
}

const Lessons: React.FC = () => {
  const [lessons, setLessons] = useState<Array<ILesson>>();

  const { navigate } = useNavigation();
  const { params } = useRoute();
  const { id } = params as IParams;

  const navigateToHome = useCallback(() => {
    navigate('Home');
  }, [navigate]);

  const navigateToLesson = useCallback(() => {
    navigate('Lesson');
  }, [navigate]);

  useEffect(() => {
    async function loadLessons() {
      const { data } = await api.get(`/course-lessons/${id}`);

      setLessons(data);
    }

    loadLessons();
  }, [id]);

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
          <ContainerHeaderText>Matemática</ContainerHeaderText>
          <CoursesQuantityText>15 aulas</CoursesQuantityText>
        </ContainerHeader>

        <LessonsList
          data={lessons}
          renderItem={({ item, index }) => {
            return (
              <Lesson>
                <ButtonPlayer isFinished onPress={navigateToLesson}>
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
                    <Badge>Completo!</Badge>
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
