import { database } from '../firebaseConfig'; // Import cấu hình Firebase
import { ref, onValue } from 'firebase/database'; // Import các hàm cần thiết từ Firebase
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const YogaDataClass = () => {
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null); // State để lưu khóa học được chọn
  const [modalVisible, setModalVisible] = useState(false); // State để điều khiển modal

  useEffect(() => {
    const courseRef = ref(database, '/courses');
    const classRef = ref(database, '/classes');

    // Lắng nghe sự thay đổi dữ liệu từ node `course`
    const unsubscribeCourses = onValue(courseRef, (snapshot) => {
      const courseData = snapshot.val();
      const formattedCourses = courseData
        ? Object.keys(courseData).map(key => ({ id: key, ...courseData[key] }))
        : [];
      setCourses(formattedCourses);
    });

    // Lắng nghe sự thay đổi dữ liệu từ node `class`
    const unsubscribeClasses = onValue(classRef, (snapshot) => {
      const classData = snapshot.val();
      const formattedClasses = classData
        ? Object.keys(classData).map(key => ({ id: key, ...classData[key] }))
        : [];
      setClasses(formattedClasses);
    });

    // Cleanup listener khi component unmount
    return () => {
      unsubscribeCourses();
      unsubscribeClasses();
    };
  }, []);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setModalVisible(true); // Hiển thị modal
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Courses</Text>
      <ScrollView>
        {courses.map(course => (
          <TouchableOpacity key={course.id} style={styles.courseContainer} onPress={() => handleCourseSelect(course)}>
            <Text style={styles.courseTitle}>{course.name}</Text>
            <Text>Description: {course.description}</Text>
            <Text>Type: {course.type}</Text>
            <Text>Day of Week: {course.dayOfWeek}</Text>
            <Text>Time: {course.time}</Text>
            <Text>Duration: {course.duration} minutes</Text>
            <Text>Price: {course.price} USD</Text>
            <Text>Capacity: {course.capacity}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal để hiển thị lớp học */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setSelectedCourse(null); // Reset khóa học đã chọn
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Classes for {selectedCourse?.name}</Text>
            {classes
              .filter(classItem => classItem.courseId === selectedCourse?.id)
              .map(classItem => (
                <View key={classItem.id} style={styles.classContainer}>
                  <Text>Teacher: {classItem.teacherName}</Text>
                  <Text>Date: {classItem.date}</Text>
                  <Text>Comments: {classItem.comments}</Text>
                </View>
              ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
                setSelectedCourse(null); // Reset khóa học đã chọn
              }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  courseContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'violet',
    borderRadius: 8,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  classContainer: {
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#e0f7fa',
    borderRadius: 5,
    width: '100%',
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default YogaDataClass;
