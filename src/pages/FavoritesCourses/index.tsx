import React, { useCallback, useEffect, useState } from 'react';
import { Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import elearningLogo from '../../assets/elearninglogo.png';
import {
  Header,
  HeaderLogo,
  Container,
  ContainerHeader,
  ContainerHeaderText,
  Courses,
  CourseContainer,
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
  ModalContainer,
  ModalContent,
  ModalText,
  ButtonWrapper,
  ModalButton,
  DismissButtonText,
  AcceptButtonText,
} from './styles';
import { useFavoriteCourses } from '../../hooks/favorites';
import SearchInput from '../../components/SearchInput';

// Interfaces
interface ILesson {
  id: string;
}

export interface ICourse {
  id: string;
  name: string;
  image: string;
  lessons?: Array<ILesson>;
}

const FavoritesCourses: React.FC = () => {
  // States
  const [courseToDelete, setCourseToDelete] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState<ICourse[]>([]);
  const [searchString, setSearchString] = useState('');

  // Hooks
  const { navigate } = useNavigation();
  const { favoriteCourses, removeFavoriteCourse } = useFavoriteCourses();

  // Init filtered data with all favorite courses
  useEffect(() => {
    setFilteredCourses(favoriteCourses);
  }, [favoriteCourses]);

  // Handle search
  const handleSubmitSearch = useCallback(() => {
    if (!searchString) {
      setFilteredCourses(favoriteCourses);
      return;
    }

    const filtered = favoriteCourses.filter(
      course =>
        course.name &&
        course.name.toLowerCase().includes(searchString.toLowerCase()),
    );

    setFilteredCourses(filtered);
  }, [searchString, favoriteCourses]);

  // Handle opening modal
  const handleOpenModal = useCallback((courseId: string) => {
    setCourseToDelete(courseId);
    setModalVisibility(true);
  }, []);

  // Navigate to lessons list screen
  const navigateToLessons = useCallback(
    (id: string) => {
      navigate('Lessons', { id });
    },
    [navigate],
  );

  // Handle deletion of a favorite course
  const handleCourseDeletion = useCallback(() => {
    removeFavoriteCourse(courseToDelete);
    setModalVisibility(false);
  }, [removeFavoriteCourse, courseToDelete]);

  // Handle navigation to home screen
  const navigateToHome = useCallback(() => {
    navigate('Home');
  }, [navigate]);

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
          <ContainerHeaderText>Cursos salvos</ContainerHeaderText>
        </ContainerHeader>

        <Courses
          data={filteredCourses}
          keyExtractor={course => course.id}
          contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row' }}
          renderItem={({ index, item }) => (
            <CourseContainer>
              <FiTrash
                name="trash"
                color="#C4C4D1"
                size={21}
                onPress={() => handleOpenModal(item.id)}
              />
              <Course
                style={{ marginLeft: index % 2 === 0 ? 0 : 17 }}
                onPress={() => navigateToLessons(item.id)}
              >
                <CourseImage source={{ uri: item.image }} />

                <CourseName>{item.name}</CourseName>

                <CourseQuantity>{item.lessons?.length} aulas</CourseQuantity>
              </Course>
            </CourseContainer>
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

      <Modal
        visible={modalVisibility}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setModalVisibility(!modalVisibility)}
      >
        <ModalContainer>
          <ModalContent>
            <Icon name="trash" size={48} color="#ff6680" />
            <ModalText>Quer excluir suas aulas desse curso?</ModalText>
            <ButtonWrapper>
              <ModalButton
                type="dismiss"
                onPress={() => setModalVisibility(!modalVisibility)}
              >
                <DismissButtonText>Não!</DismissButtonText>
              </ModalButton>

              <ModalButton type="accept" onPress={handleCourseDeletion}>
                <AcceptButtonText>Com certeza</AcceptButtonText>
              </ModalButton>
            </ButtonWrapper>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default FavoritesCourses;
