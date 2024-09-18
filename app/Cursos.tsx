import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Asegúrate de instalar @react-native-picker/picker
import { Colors } from '@/constants/Colors';
import { SelectCursosList, SelectTipoCurso } from './../constants/Options';
import { TextInput } from 'react-native-paper';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Asegúrate de importar correctamente los métodos de Firestore
import { useNavigation } from '@react-navigation/native';  // Importa el hook de navegación

const { width } = Dimensions.get('window');
const isSmallScreen = width < 600;

export default function Cursos() {
    const [selectedYear, setSelectedYear] = useState<string>(''); // Inicializa como string vacío
    const [selectedTipoCurso, setSelectedTipoCurso] = useState<string>(''); // Inicializa como string vacío
    const [courseName, setCourseName] = useState<string>(''); // Inicializa como string vacío

    const navigation = useNavigation();  // Inicializa la navegación

    // Función para manejar el botón "Agregar"
    const handleContinue = async () => {
        if (!courseName || !selectedYear || !selectedTipoCurso) {
            Alert.alert('Error', 'Por favor complete todos los campos');
            return;
        }

        try {
            const db = getFirestore();
            await addDoc(collection(db, 'materias'), {  // addDoc espera una colección y un objeto, no un array.
                courseName: courseName,
                year: selectedYear,
                tipoCurso: selectedTipoCurso,
                createdAt: serverTimestamp(),
            });

            Alert.alert('Éxito', 'Materia agregada exitosamente');
            setCourseName('');
            setSelectedYear('');
            setSelectedTipoCurso('');

            // Redirigir a la página "myInicio" después del éxito
            navigation.navigate('myInicio' as never);
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al agregar la materia');
            console.error(error);
        }
    };

    return (
        <View style={styles(isSmallScreen).mainContainer}>
            <Text style={{ fontSize: isSmallScreen ? 23 : 32, marginBottom: isSmallScreen ? 16 : 24 }}>
                Carga de Cursos
            </Text>
            <TextInput
                style={styles(isSmallScreen).input}
                placeholder='Nombre del Curso'
                value={courseName}
                onChangeText={setCourseName}
            />

            {/* Selector de Año */}
            <Picker
                selectedValue={selectedYear}
                style={styles(isSmallScreen).picker}
                onValueChange={(itemValue: string) => setSelectedYear(itemValue)}  // Tipado explícito
            >
                <Picker.Item label="Seleccione un Año" value="" />
                {SelectCursosList.map((item) => (
                    <Picker.Item key={item.id} label={item.title} value={item.id.toString()} />
                ))}
            </Picker>

            {/* Selector de Tipo de Curso, habilitado solo si se ha seleccionado un año */}
            <Picker
                selectedValue={selectedTipoCurso}
                style={[styles(isSmallScreen).picker, { opacity: selectedYear ? 1 : 0.5 }]}
                onValueChange={(itemValue: string) => setSelectedTipoCurso(itemValue)}  // Tipado explícito
                enabled={!!selectedYear}
            >
                <Picker.Item label="Seleccione un Tipo de Curso" value="" />
                {SelectTipoCurso.map((item) => (
                    <Picker.Item key={item.id} label={item.title} value={item.id.toString()} />
                ))}
            </Picker>
            <TouchableOpacity onPress={handleContinue} style={styles(isSmallScreen).button}>
                <Text style={styles(isSmallScreen).buttonText}>Agregar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = (isSmallScreen: boolean) =>
    StyleSheet.create({
        mainContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: isSmallScreen ? 16 : 32,
        },
        input: {
            width: isSmallScreen ? "90%" : "50%",
            height: 40,
            backgroundColor: Colors.WHITE,
            borderWidth: 1,
            marginBottom: 12,
            paddingHorizontal: 8,
        },
        button: {
            paddingVertical: 12,
            paddingHorizontal: 32,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 15,
            marginTop: 20,
        },
        buttonText: {
            color: "#fff",
            fontSize: 16,
        },
        picker: {
            width: isSmallScreen ? '90%' : '50%',
            height: 40,
            marginBottom: 20,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
        },
    });
