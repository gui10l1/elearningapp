import React, { useCallback } from 'react';
import { Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
  Badge,
} from './styles';

const Lessons: React.FC = () => {
  const { navigate } = useNavigation();

  const navigateToHome = useCallback(() => {
    navigate('Home');
  }, [navigate]);

  const navigateToLesson = useCallback(() => {
    navigate('Lesson');
  }, [navigate]);

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

        <LessonsList>
          <Lesson>
            <ButtonPlayer isFinished onPress={navigateToLesson}>
              <Image source={playerIcon} />
            </ButtonPlayer>

            <LessonContent>
              <LessonTitle>Introdução à teoria matemática</LessonTitle>

              <LessonDescription>
                <View style={{ flexDirection: 'row' }}>
                  <LessonDescriptionText>Aula 01</LessonDescriptionText>
                  <Duration>
                    <Icon name="clock" size={10} color="#C4C4D1" />
                    5min
                  </Duration>
                </View>
                <Badge>Completo!</Badge>
              </LessonDescription>
            </LessonContent>
          </Lesson>

          <Lesson>
            <ButtonPlayer isFinished>
              <Image source={playerIcon} />
            </ButtonPlayer>

            <LessonContent>
              <LessonTitle>Introdução à teoria matemática</LessonTitle>

              <LessonDescription>
                <View style={{ flexDirection: 'row' }}>
                  <LessonDescriptionText>Aula 01</LessonDescriptionText>
                  <Duration>
                    <Icon name="clock" size={10} color="#C4C4D1" />
                    5min
                  </Duration>
                </View>
                <Badge>Completo!</Badge>
              </LessonDescription>
            </LessonContent>
          </Lesson>

          <Lesson>
            <ButtonPlayer isFinished>
              <Image source={playerIcon} />
            </ButtonPlayer>

            <LessonContent>
              <LessonTitle>Introdução à teoria matemática</LessonTitle>

              <LessonDescription>
                <View style={{ flexDirection: 'row' }}>
                  <LessonDescriptionText>Aula 01</LessonDescriptionText>
                  <Duration>
                    <Icon name="clock" size={10} color="#C4C4D1" />
                    5min
                  </Duration>
                </View>
                <Badge>Completo!</Badge>
              </LessonDescription>
            </LessonContent>
          </Lesson>

          <Lesson>
            <ButtonPlayer isFinished>
              <Image source={playerIcon} />
            </ButtonPlayer>

            <LessonContent>
              <LessonTitle>Introdução à teoria matemática</LessonTitle>

              <LessonDescription>
                <View style={{ flexDirection: 'row' }}>
                  <LessonDescriptionText>Aula 01</LessonDescriptionText>
                  <Duration>
                    <Icon name="clock" size={10} color="#C4C4D1" />
                    5min
                  </Duration>
                </View>
                <Badge>Completo!</Badge>
              </LessonDescription>
            </LessonContent>
          </Lesson>

          <Lesson>
            <ButtonPlayer isFinished>
              <Image source={playerIcon} />
            </ButtonPlayer>

            <LessonContent>
              <LessonTitle>Introdução à teoria matemática</LessonTitle>

              <LessonDescription>
                <View style={{ flexDirection: 'row' }}>
                  <LessonDescriptionText>Aula 01</LessonDescriptionText>
                  <Duration>
                    <Icon name="clock" size={10} color="#C4C4D1" />
                    5min
                  </Duration>
                </View>
                <Badge>Completo!</Badge>
              </LessonDescription>
            </LessonContent>
          </Lesson>

          <Lesson>
            <ButtonPlayer isFinished>
              <Image source={playerIcon} />
            </ButtonPlayer>

            <LessonContent>
              <LessonTitle>Introdução à teoria matemática</LessonTitle>

              <LessonDescription>
                <View style={{ flexDirection: 'row' }}>
                  <LessonDescriptionText>Aula 01</LessonDescriptionText>
                  <Duration>
                    <Icon name="clock" size={10} color="#C4C4D1" />
                    5min
                  </Duration>
                </View>
                <Badge>Completo!</Badge>
              </LessonDescription>
            </LessonContent>
          </Lesson>
        </LessonsList>
      </Container>
    </>
  );
};

export default Lessons;
