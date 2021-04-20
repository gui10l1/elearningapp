import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import elearningLogo from '../../assets/elearninglogo.png';
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
import api from '../../services/elearningApi';

interface ILesson {
  id: string;
}

export interface ICourse {
  id: string;
  image: string;
  name: string;
  lessons: ILesson[];
}

const Home: React.FC = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);

  const { navigate } = useNavigation();

  // Load courses from API
  useEffect(() => {
    async function loadCourses() {
      const { data } = await api.get<Array<ICourse>>('/courses');

      setCourses(data);
    }

    loadCourses();
  }, []);

  // Handle search
  const handleSubmitSearch = useCallback(() => {
    // CODE
  }, []);

  // Navigate to favorite courses screen
  const navigateToFavoriteCourses = useCallback(() => {
    navigate('Favorites');
  }, [navigate]);

  // Navigate to lessons list screen
  const navigateToLessons = useCallback(
    (id: string) => {
      navigate('Lessons', { id });
    },
    [navigate],
  );

  // Screen
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
          <CoursesQuantityText>{courses.length} cursos</CoursesQuantityText>
        </ContainerHeader>

        <Courses
          data={courses}
          keyExtractor={course => course.id}
          contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row' }}
          renderItem={({ index, item }) => {
            const restIndex = index % 2;

            if (restIndex === 0) {
              return (
                <Course
                  style={{ marginLeft: 0 }}
                  onPress={() => navigateToLessons(item.id)}
                >
                  <CourseImage source={{ uri: item.image }} />

                  <CourseName>{item.name}</CourseName>

                  <CourseQuantity>{item.lessons.length} aulas</CourseQuantity>
                </Course>
              );
            }

            return (
              <Course onPress={() => navigateToLessons(item.id)}>
                <CourseImage source={{ uri: item.image }} />

                <CourseName>{item.name}</CourseName>

                <CourseQuantity>{item.lessons.length} aulas</CourseQuantity>
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
