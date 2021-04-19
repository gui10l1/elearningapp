import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import Icon from 'react-native-vector-icons/Feather';

import elearningLogo from '../../assets/elearninglogo.png';
import math from '../../assets/Math.png';
import Input from '../../components/Input';
import {
  Header,
  HeaderLogo,
  Container,
  ContainerHeader,
  ContainerHeaderText,
  Courses,
  Course,
  FiTrash,
  CourseImage,
  CourseName,
  CourseQuantity,
  ContainerFooter,
  Home as HomeButton,
  HomeButtonText,
  Favorites,
  FavoritesText,
  Line,
} from './styles';

const FavoritesCourses: React.FC = () => {
  const { navigate } = useNavigation();

  const navigateToHome = useCallback(() => {
    navigate('Home');
  }, [navigate]);

  const handleSubmitSearch = useCallback(() => {
    // CODE
  }, []);

  return (
    <>
      <Header>
        <HeaderLogo>
          <Image source={elearningLogo} />

          <Icon name="power" color="#FF6680" size={24} />
        </HeaderLogo>

        <Form onSubmit={handleSubmitSearch}>
          <Input name="search" icon="search" placeholder="Busque um curso" />
        </Form>
      </Header>

      <Container>
        <ContainerHeader>
          <ContainerHeaderText>Cursos salvos</ContainerHeaderText>
        </ContainerHeader>

        <Courses
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          <Course style={{ marginLeft: 0 }}>
            <FiTrash name="trash" color="#C4C4D1" size={21} />

            <CourseImage source={math} />

            <CourseName>Matemática</CourseName>

            <CourseQuantity>16 aulas</CourseQuantity>
          </Course>

          <Course>
            <FiTrash name="trash" color="#C4C4D1" size={21} />

            <CourseImage source={math} />

            <CourseName>Matemática</CourseName>

            <CourseQuantity>16 aulas</CourseQuantity>
          </Course>

          <Course style={{ marginLeft: 0 }}>
            <FiTrash name="trash" color="#C4C4D1" size={21} />

            <CourseImage source={math} />

            <CourseName>Matemática</CourseName>

            <CourseQuantity>16 aulas</CourseQuantity>
          </Course>

          <Course>
            <FiTrash name="trash" color="#C4C4D1" size={21} />

            <CourseImage source={math} />

            <CourseName>Matemática</CourseName>

            <CourseQuantity>16 aulas</CourseQuantity>
          </Course>

          <Course style={{ marginLeft: 0 }}>
            <FiTrash name="trash" color="#C4C4D1" size={21} />

            <CourseImage source={math} />

            <CourseName>Matemática</CourseName>

            <CourseQuantity>16 aulas</CourseQuantity>
          </Course>

          <Course>
            <FiTrash name="trash" color="#C4C4D1" size={21} />

            <CourseImage source={math} />

            <CourseName>Matemática</CourseName>

            <CourseQuantity>16 aulas</CourseQuantity>
          </Course>
        </Courses>
      </Container>

      <ContainerFooter>
        <HomeButton onPress={navigateToHome}>
          <Icon name="home" size={24} color="#C4C4D1" />
          <HomeButtonText>Home</HomeButtonText>
        </HomeButton>

        <Favorites>
          <Line />
          <Icon name="heart" size={24} color="#FF6680" />
          <FavoritesText>Salvos</FavoritesText>
        </Favorites>
      </ContainerFooter>
    </>
  );
};

export default FavoritesCourses;
