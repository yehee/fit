import React, { useEffect, useState } from 'react';
import { View, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState as useStore } from '@hookstate/core'
import { Text } from '../components'
import { primary } from '../style'
import store from '../store'

const placeholder = 'https://images.unsplash.com/photo-1594269807769-c07238cb51b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'

function UserScreen() {
    const [image, setImage] = useState(null);
    const { user } = useStore(store)
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: image ?? placeholder }} style={{ width: 100, height: 100, borderRadius: 100 }} />
            <Text onPress={pickImage} style={{ color: primary, marginVertical: 10 }}>Change profile</Text>
            <Text>{user.get().name}</Text>
            <Text>{user.get().email}</Text>
        </View>
    );
}

export default UserScreen;
