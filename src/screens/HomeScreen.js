// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, addPost } from '../features/posts/postsSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { items, fetchStatus, fetchError, addStatus, addError } = useSelector(
    (state) => state.posts
  );

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    // Al montar, obtener publicaciones
    dispatch(fetchPosts());
  }, [dispatch]);

  const [isPosting, setIsPosting] = useState(false);

  const handleAddPost = async () => {
    if (!title.trim() || !body.trim()) {
      Alert.alert(
        'Campos incompletos',
        'Por favor completá el título y el contenido antes de publicar.'
      );
      return;
    }

    const newPost = {
      title,
      body,
      userId: 1, // Dummy
    };

    try {
      setIsPosting(true);
      await dispatch(addPost(newPost)).unwrap();
      Alert.alert('Publicación creada correctamente');
      setTitle('');
      setBody('');
    } catch (err) {
      Alert.alert('Error', 'No se pudo crear la publicación');
    } finally {
      setIsPosting(false);
    }
  };

  const isLoading = fetchStatus === 'loading';
  const isLoadingAdd = addStatus === 'loading' || isPosting;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MiniBlog de Clases</Text>

      {isLoading && <Text>Cargando publicaciones...</Text>}
      {isLoading && <ActivityIndicator />}
      {fetchError && <Text style={styles.error}>{fetchError}</Text>}
      {addError && <Text style={styles.error}>{addError}</Text>}

      <FlatList
        data={items}
        keyExtractor={(item, index) => (item.id ? `${item.id}-${index}` : `local-${index}`)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
        ListEmptyComponent={
          !isLoading && (
            <Text style={styles.empty}>No hay publicaciones todavía.</Text>
          )
        }
      />

      <View style={styles.form}>
        <Text style={styles.formTitle}>Nueva publicación</Text>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Contenido"
          value={body}
          onChangeText={setBody}
          multiline
        />
        <Button
          title={isLoadingAdd ? 'Enviando...' : 'Publicar'}
          onPress={handleAddPost}
          disabled={!title.trim() || !body.trim() || isLoadingAdd}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 40 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  card: {
    padding: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 4,
  },
  title: { fontWeight: 'bold', marginBottom: 4 },
  empty: { textAlign: 'center', marginTop: 16, fontStyle: 'italic' },
  form: { marginTop: 16 },
  formTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  multiline: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  error: { color: 'red', marginVertical: 8 },
});

export default HomeScreen;
