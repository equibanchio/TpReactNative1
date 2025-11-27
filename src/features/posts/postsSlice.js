// src/features/posts/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  fetchStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  fetchError: null,
  addStatus: 'idle',
  addError: null,
};

// Thunk para GET
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts?_limit=10'
    );
    if (!response.ok) {
      throw new Error('Error al obtener publicaciones');
    }
    const data = await response.json();
    return data;
  }
);

// Thunk para POST
export const addPost = createAsyncThunk(
  'posts/addPost',
  async (newPost) => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      }
    );
    if (!response.ok) {
      throw new Error('Error al crear la publicación');
    }
    const data = await response.json();
    return data;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Si quisieras agregar acciones síncronas locales, van acá.
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchPosts.pending, (state) => {
        state.fetchStatus = 'loading';
        state.fetchError = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        // Ordena para que los posts más nuevos (mayor id) aparezcan primero
        state.items = action.payload.slice().sort((a, b) => (b.id || 0) - (a.id || 0));
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.fetchError = 'Error al obtener publicaciones';
      })
      // POST
      .addCase(addPost.pending, (state) => {
        state.addStatus = 'loading';
        state.addError = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.addStatus = 'succeeded';
        // Inserta el nuevo post al inicio
        state.items.unshift(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.addStatus = 'failed';
        state.addError = 'Error al crear publicación';
      });
  },
});

export default postsSlice.reducer;
