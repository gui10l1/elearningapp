import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import elearningLogo from '../../assets/elearninglogo.png';
import math from '../../assets/Math.png';
import Input from '../../components/Input';
import {
  Header,
  HeaderLogo,
  Container,
  ContainerHeader,
  ContainerHeaderText,
  CoursesQuantityText,
  Courses,
  Course,
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
import elearningApi from '../../services/elearningApi';

interface ILesson {
  id: string;
}

interface ICourse {
  id: string;
  image: string;
  name: string;
  lessions: ILesson[];
}

const Home: React.FC = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);

  const { navigate } = useNavigation();

  useEffect(() => {
    async function loadCourses() {
      const { data } = await elearningApi.get<Array<ICourse>>('/courses');

      setCourses(data);
    }

    loadCourses();
  }, []);

  const handleSubmitSearch = useCallback(() => {
    // CODE
  }, []);

  const navigateToFavoriteCourses = useCallback(() => {
    navigate('Favorites');
  }, [navigate]);

  const navigateToLessons = useCallback(() => {
    navigate('Lessons');
  }, [navigate]);

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
          <ContainerHeaderText>Categorias</ContainerHeaderText>
          <CoursesQuantityText>43 cursos</CoursesQuantityText>
        </ContainerHeader>

        <Courses
          data={courses}
          keyExtractor={(course: any) => course.id}
          renderItem={({ index, item }) => {
            const parsedItem = item as any;
            const restIndex = index % 2;

            if (restIndex === 0) {
              return (
                <Course style={{ marginLeft: 0 }} onPress={navigateToLessons}>
                  <CourseImage source={parsedItem.image} />

                  <CourseName>{parsedItem.name}</CourseName>

                  <CourseQuantity>{parsedItem.lessons.length}</CourseQuantity>
                </Course>
              );
            }

            return (
              <Course onPress={navigateToLessons}>
                <CourseImage source={parsedItem.image} />

                <CourseName>{parsedItem.name}</CourseName>

                <CourseQuantity>{parsedItem.lessons.length}</CourseQuantity>
              </Course>
            );
          }}
        />
      </Container>
      <ContainerFooter>
        <HomeButton>
          <Line />
          <Icon name="home" size={24} color="#FF6680" />
          <HomeButtonText>Home</HomeButtonText>
        </HomeButton>

        <Favorites onPress={navigateToFavoriteCourses}>
          <Icon name="heart" size={24} color="#C4C4D1" />
          <FavoritesText>Salvos</FavoritesText>
        </Favorites>
      </ContainerFooter>
    </>
  );
};

export default Home;
