import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../../services/api';

export function Menu() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Simulando o carregamento das categorias do banco de dados
  useEffect(() => {
    // Aqui você pode substituir pela lógica real para obter as categorias do banco de dados
    const fetchCategoriesFromDatabase = async () => {
      // Simulação de uma chamada assíncrona ao banco de dados
      
        const response = await api.get("/Categoria/mostrar")
        
      setCategories(response.data);
    };

    fetchCategoriesFromDatabase();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setDropdownVisible(!dropdownVisible)}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedCategory ? selectedCategory.categoria : 'Selecione uma categoria'}
        </Text>
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={styles.dropdownList}>
          {categories.map((categoria) => (
            <TouchableOpacity
              key={categoria.id}
              style={styles.dropdownItem}
              onPress={() => handleCategorySelect(categoria)}
            >
              <Text style={styles.dropdownItemText}>{categoria.categoria}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    width: 100
},
  dropdownButtonText: {
    fontSize: 16,
  },
  dropdownList: {
    marginTop: 10,
    backgroundColor: 'purple',
    borderRadius: 5,
    padding: 10,
  },
  dropdownItem: {
    paddingVertical: 5,
  },
  dropdownItemText: {
    fontSize: 16,
  },
});


