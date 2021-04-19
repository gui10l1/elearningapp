import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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

const Lesson: React.FC = () => {
  const { navigate } = useNavigation();

  const navigateToLessons = useCallback(() => {
    navigate('Lessons');
  }, [navigate]);

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
        <Video>
          <PlayerImage source={playerIcon} />
        </Video>

        <Content>
          <Title>Introdução à teoria matemática</Title>

          <LessonInfo>
            <LessonName>Aula 01</LessonName>

            <Duration>
              <FiClock name="clock" size={14} />
              <DurationText>5min</DurationText>
            </Duration>
          </LessonInfo>

          <Descripition>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus
            condimentum gravida. Aenean condimentum vehicula sapien, eleifend
            metus congue vel. Suspendisse vitae tellus eu lacus facilisis auctor
            nec tristique eros.
          </Descripition>

          <ButtonWrapper>
            <BackButton>
              <Icon name="arrow-left" size={20} color="#FF6680" />
              <BackButtonText>Aula anterior</BackButtonText>
            </BackButton>

            <ForwardButton>
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
