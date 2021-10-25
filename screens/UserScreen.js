import React, { useEffect, useState } from 'react';
import { View, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Text from '../components/Text'

const user = {
    name: 'Alice',
    email: 'alice@yawl.io',
}

function UserScreen() {
    const [image, setImage] = useState(null);
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

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: image ?? 'https://images.unsplash.com/photo-1594269807769-c07238cb51b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' }} style={{ width: 100, height: 100, borderRadius: 100 }} />
            <Text onPress={pickImage} style={{ color: 'orangered', marginVertical: 10 }}>Change profile</Text>
            <Text>{user.name}</Text>
            <Text>{user.email}</Text>
        </View>
    );
}

export default UserScreen;
