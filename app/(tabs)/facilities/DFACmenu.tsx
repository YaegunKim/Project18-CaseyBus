import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function DFACmenu() {
    return (
        <ScrollView>
            <View style={styles.menuBox}>
                <View style={styles.menuHeaderRow}>
                    <Text style={[styles.menuHeader, {flex: 1}]}>DFAC</Text>
                    <Text style={[styles.menuHeader, {flex: 1, textAlign: 'center'}]}>Mon</Text>
                    <Text style={[styles.menuHeader, {flex: 1, textAlign: 'center'}]}>Tue</Text>
                    <Text style={[styles.menuHeader, {flex: 1, textAlign: 'center'}]}>Wed</Text>
                    <Text style={[styles.menuHeader, {flex: 1, textAlign: 'center'}]}>Thu</Text>
                    <Text style={[styles.menuHeader, {flex: 1, textAlign: 'center'}]}>Fri</Text>
                </View>

                <View style={styles.menuRow}>
                    <Text style={[styles.menuLabel, {flex: 1}]}>Main</Text>
                    <Text style={[styles.menuText, {flex: 1, textAlign: 'center'}]}>?</Text>
                    <Text style={[styles.menuText, {flex: 1, textAlign: 'center'}]}>Taco</Text>
                    <Text style={[styles.menuText, {flex: 1, textAlign: 'center'}]}>?</Text>
                    <Text style={[styles.menuText, {flex: 1, textAlign: 'center'}]}>?</Text>
                    <Text style={[styles.menuText, {flex: 1, textAlign: 'center'}]}>?</Text>
                </View>

                <View style={styles.menuRow}>
                    <Text style={[styles.menuLabel, {flex: 1}]}>Thunder</Text>
                    <Text style={[styles.menuText, {flex: 1, textAlign: 'center'}]}>?</Text>
                    <Text style={[styles.menuText, {flex: 1, textAlign: 'center'}]}>?</Text>
                    <Text style={[styles.menuText, {flex: 1, textAlign: 'center'}]}>?</Text>
                    <Text style={[styles.menuText, {flex: 1, textAlign: 'center'}]}>?</Text>
                    <Text style={[styles.menuText, {flex: 1, textAlign: 'center'}]}>?</Text>
                </View>

                <View style={styles.menuRow}>
                    <Text style={[styles.menuLabel, {flex: 1}]}>Argonne</Text>
                    <Text style={[styles.menuText, {flex: 1, textAlign: 'center'}]}>?</Text>
                    <Text style={[styles.menuText, {flex: 1, textAlign: 'center'}]}>?</Text>
                    <Text style={[styles.menuText, {flex: 1, textAlign: 'center'}]}>Bibimbap</Text>
                    <Text style={[styles.menuText, {flex: 1, textAlign: 'center'}]}>?</Text>
                    <Text style={[styles.menuText, {flex: 1, textAlign: 'center'}]}>?</Text>
                </View>

                <View style={styles.menuRow}>
                    <Text style={[styles.menuLabel, {flex: 1}]}>Hovey</Text>
                    <Text style={[styles.menuText, {flex: 1, textAlign: 'center'}]}>?</Text>
                    <Text style={[styles.menuText, {flex: 1, textAlign: 'center'}]}>?</Text>
                    <Text style={[styles.menuText, {flex: 1, textAlign: 'center'}]}>?</Text>
                    <Text style={[styles.menuText, {flex: 1, textAlign: 'center'}]}>?</Text>
                    <Text style={[styles.menuText, {flex: 1, textAlign: 'center'}]}>?</Text>
                </View>
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    menuBox: {
        paddingHorizontal: 2,
        paddingVertical: 10,
    },
    menuHeaderRow: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    menuHeader: {
        fontSize: 11,
        fontWeight: '600',
        color: '#4b4b4bff',
    },
    menuRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 2,
    },
    menuLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: '#4b4b4bff',
    },
    menuText: {
        fontSize: 12,
        color: '#4b4b4bff',
    }
});