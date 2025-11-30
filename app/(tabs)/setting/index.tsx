// app/(settings)/AboutUs.tsx
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AboutUs() {
  const dial = (num: string) => Linking.openURL(`tel:${num}`);
  const router = useRouter();


  return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <FontAwesome6 name="bus" size={26} style={[{color: '#fff'}]}/>
          </View>
          <Text style={styles.title}>About CaseyBus</Text>
          <Text style={styles.subtitle}>Public-purpose shuttle info for Camp Casey</Text>
        </View>

        {/* Mission / Purpose */}
        <View style={styles.card}>
          <View style={styles.row}>
            <FontAwesome6 name="shield-halved" size={18} style={styles.icon} />
            <Text style={styles.cardTitle}>Purpose</Text>
          </View>
          <Text style={styles.body}>
            This app was created for a public purpose to help the Camp Casey community navigate base shuttle routes
            using static schedules. The team does not collect personal data, and no GPS tracking of buses is used.
          </Text>
          <Text style={styles.bodyKr}>
            본 앱은 공익 목적으로 제작되었으며, 정적 시간표 기반 안내만 제공합니다. 개인정보를 수집하지 않으며, 버스 GPS 추적 기능은 사용하지 않습니다.
          </Text>
        </View>

        {/* Unit / Attribution */}
        <View style={styles.card}>
          <View style={styles.row}>
            <FontAwesome6 name="landmark" size={18} style={styles.icon} />
            <Text style={styles.cardTitle}>Affiliation</Text>
          </View>
          <Text style={styles.bodyEmph}>AREA I · Camp Casey</Text>
          <Text style={styles.body}>Military Police Traffic Investigation Unit</Text>
          <View style={styles.divider} />
          <Text style={styles.body}>
            Developers {"\n"}
            • Military Police Traffic Investigator (KATUSA) {"\n"}
            • PMO Admin (KATUSA) {"\n"}
            • Military Police (KATUSA)
          </Text>
          <Text style={styles.caption}>
            We keep personal identities low-profile. Please refer to the unit designation above.
          </Text>
        </View>

        {/* Contact */}
        <View style={styles.card}>
          <View style={styles.row}>
            <FontAwesome6 name="phone" size={18} style={styles.icon} />
            <Text style={styles.cardTitle}>Contact (Non-emergency)</Text>
          </View>
          <TouchableOpacity style={styles.contactRow} onPress={() => dial("01031009576")} accessibilityLabel="Call 010-3100-9576">
            <FontAwesome6 name="mobile-screen" size={16} style={[styles.contactIcon,{color: '#fff'}]} />
            <Text style={styles.contactText}>010-3100-9576 (Duty Cell)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactRow} onPress={() => dial("05037224718")} accessibilityLabel="Call 0503-722-4718">
            <FontAwesome6 name="phone-flip" size={16} style={[styles.contactIcon,{color: '#fff'}]} />
            <Text style={styles.contactText}>0503-722-4718 (NCOIC Desk)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactRow} onPress={() => dial("05037224731")} accessibilityLabel="Call 0503-722-4731">
            <FontAwesome6 name="phone-flip" size={16} style={[styles.contactIcon,{color: '#fff'}]} />
            <Text style={styles.contactText}>0503-722-4731 (KATUSA Desk)</Text>
          </TouchableOpacity>
          <Text style={styles.caption}>
            For emergencies, use your unit’s official emergency channels or call 911.
          </Text>
        </View>

        {/* Footer note */}
        <Text style={styles.footer}>
          © {new Date().getFullYear()} CaseyBus · Built with respect for the Camp Casey community.
        </Text>
        <TouchableOpacity style={styles.buttonTouchable} onPress={() => router.push('/setting/privacy')}>
          <Text style={styles.buttonText}>privacy policy</Text>
        </TouchableOpacity>
      </ScrollView>

    
  );
}

const CARD_BG = "#fff";
const TEXT = "rgba(56, 56, 56, 1)"
const MUTED = "#919191ff";
const LIGHT_BLUE = "#338AE0";
const LIGHT_GRAY = "#0000002f";

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40, backgroundColor: '#f5f7f6', paddingTop: 50 },
  header: { alignItems: "center", marginTop: 8, marginBottom: 18 },
  logoCircle: {
    width: 56, height: 56, borderRadius: 28, alignItems: "center", justifyContent: "center",
    backgroundColor: LIGHT_BLUE
  },
  title: { marginTop: 10, fontSize: 20, fontWeight: "700", color: TEXT, letterSpacing: 0.5 },
  subtitle: { marginTop: 4, fontSize: 12, color: MUTED },
  card: {
    backgroundColor: CARD_BG, borderRadius: 16, padding: 16, marginBottom: 14,
    borderWidth: 1, borderColor: LIGHT_GRAY
  },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  icon: { marginRight: 8, color: LIGHT_BLUE },
  cardTitle: { fontSize: 14, fontWeight: "700", color: TEXT, letterSpacing: 0.4 },
  body: { marginTop: 2, fontSize: 13.5, lineHeight: 20, color: TEXT },
  bodyKr: { marginTop: 8, fontSize: 13, lineHeight: 20, color: TEXT, opacity: 0.95 },
  bodyEmph: { marginTop: 2, fontSize: 13.5, fontWeight: "700", color: LIGHT_BLUE },
  caption: { marginTop: 10, fontSize: 11.5, color: MUTED },
  divider: {
    height: 1, backgroundColor: LIGHT_GRAY, marginVertical: 10, opacity: 0.7
  },
  contactRow: {
    flexDirection: "row", alignItems: "center", paddingVertical: 8, borderRadius: 10,
    paddingHorizontal: 10, backgroundColor: LIGHT_BLUE, marginTop: 4
  },
  contactIcon: { marginRight: 8, color: LIGHT_BLUE },
  contactText: { fontSize: 13.5, color: '#fff', fontWeight: "600", letterSpacing: 0.3 },
  footer: {
    marginTop: 10, textAlign: "center", fontSize: 11.5, color: MUTED, opacity: 0.9
  },


  buttonTouchable: {
    alignItems: "center",
    marginTop: 12
  },
  buttonText: {
    color: MUTED,
    fontSize: 11.5,
    opacity: 0.9,
  }
});
