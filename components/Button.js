import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Button({ label, theme, onPress }) {
    if (theme === "primary") {
        return (
            <View style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 5 }]}>
                <Pressable
                    style={[styles.button, { backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', padding: 10 }]}
                    onPress={onPress}
                >
                    
                    <FontAwesome
                        name="picture-o"
                        size={18}
                        color="#25292e"
                        style={styles.buttonIcon}
                    />
                    <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
                </Pressable>
                
            </View>
            
        );
    }

    return (
        <View style={styles.buttonContainer}>
            <Pressable style={[styles.button, { padding: 10 }]} onPress={onPress}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        margin: 10,
        borderWidth: 2,
        borderRadius: 18,
    },
    button: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonIcon: {
        marginRight: 10,
    },
    buttonLabel: {
        fontSize: 16,
    },
});
