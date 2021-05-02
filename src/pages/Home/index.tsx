import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import elearningLogo from '../../assets/elearninglogo.png';
import SearchInput from '../../components/SearchInput';
import {
  Header,
  HeaderLogo,
  Container,
  ContainerHeader,
  ContainerHeaderText,
  CoursesQuantityText,
  Loading,
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

// Interfaces
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
  // States
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<ICourse[]>([]);
  const [searchString, setSearchString] = useState('');

  // Hooks
  const { navigate } = useNavigation();

  // Load courses from API
  useEffect(() => {
    async function loadCourses() {
      const { data } = await api.get<Array<ICourse>>('/courses');

      setCourses(data);
      setFilteredCourses(data);
      setLoading(false);
    }

    loadCourses();
  }, []);

  // Handle search
  const handleSubmitSearch = useCallback(() => {
    if (!searchString) {
      setFilteredCourses(courses);
      return;
    }

    const filtered = courses.filter(
      course =>
        course.name &&
        course.name.toLowerCase().includes(searchString.toLowerCase()),
    );

    setFilteredCourses(filtered);
  }, [searchString, courses]);

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

        <SearchInput
          icon="search"
          placeholder="Busque um curso"
          onKeyPress={handleSubmitSearch}
          onChangeText={value => setSearchString(value)}
        />
      </Header>

      <Container>
        <ContainerHeader>
          <ContainerHeaderText>Categorias</ContainerHeaderText>
          <CoursesQuantityText>{courses.length} cursos</CoursesQuantityText>
        </ContainerHeader>

        {loading ? (
          <Loading>
            <ActivityIndicator size={20} color="#ff6680" />
          </Loading>
        ) : (
          <Courses
            data={filteredCourses}
            keyExtractor={course => course.id}
            contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row' }}
            renderItem={({ index, item }) => {
              return (
                <Course
                  style={{ marginLeft: index % 2 === 0 ? 0 : 16 }}
                  onPress={() => navigateToLessons(item.id)}
                >
                  <CourseImage
                    source={{
                      uri: item.image,
                    }}
                  />

                  <CourseName>{item.name}</CourseName>

                  <CourseQuantity>{item.lessons.length} aulas</CourseQuantity>
                </Course>
              );
            }}
          />
        )}
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
