import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import Icon from 'react-native-vector-icons/Feather';

import elearningLogo from '../../assets/elearninglogo.png';
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
import { useFavoriteCourses } from '../../hooks/favorites';

export interface ICourse {
  id: string;
  name: string;
  image: string;
}

const FavoritesCourses: React.FC = () => {
  const { navigate } = useNavigation();
  const { favoriteCourses, removeFavoriteCourse } = useFavoriteCourses();

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
          data={favoriteCourses}
          keyExtractor={course => course.id}
          contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row' }}
          renderItem={({ index, item }) => (
            <Course style={{ marginLeft: index % 2 === 0 ? 0 : 17 }}>
              <FiTrash
                name="trash"
                color="#C4C4D1"
                size={21}
                onPress={() => removeFavoriteCourse(item.id)}
              />

              <CourseImage source={{ uri: item.image }} />

              <CourseName>{item.name}</CourseName>

              <CourseQuantity>5</CourseQuantity>
            </Course>
          )}
        />
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
