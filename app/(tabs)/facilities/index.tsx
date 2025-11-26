import { FontAwesome6 } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DFACmenu from './DFACmenu';

export default function Facilities() {
  const [InfoTime_DFAC, setInfoTime_DFAC] = useState<boolean>(false);
  const [InfoTime_KSB, setInfoTime_KSB] = useState<boolean>(false);
  const [InfoTime_BarberShop, setInfoTime_BarborShop] = useState<boolean>(false);
  const [InfoTime_GYM, setInfoTime_GYM] = useState<boolean>(false);
  const [InfoTime_CAC, setInfoTime_CAC] = useState<boolean>(false);
  const [InfoTime_USO, setInfoTime_USO] = useState<boolean>(false);
  const [InfoTime_Library, setInfoTime_Library] = useState<boolean>(false);

  // 🔹 DFAC 메뉴 모달 on/off
  const [showDFACMenu, setShowDFACMenu] = useState(false);

  return (
    <>
      {/* 🔹 DFAC 메뉴 팝업 모달 */}
      <Modal
        visible={showDFACMenu}
        transparent
        onRequestClose={() => setShowDFACMenu(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>DFAC Menu</Text>
              <TouchableOpacity onPress={() => setShowDFACMenu(false)}>
                <FontAwesome6 name="xmark" size={18} />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <DFACmenu />
            </ScrollView>
          </View>
        </View>
      </Modal>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <FontAwesome6 name="clock" size={26} style={{ color: '#fff' }} />
          </View>
          <Text style={styles.title}>On Base Facilities</Text>
          <Text style={styles.subtitle}>Essential services and facility hours</Text>
        </View>

        {/* DFAC */}
        <TouchableOpacity
          style={styles.InfoBox}
          onPress={() => { setInfoTime_DFAC(!InfoTime_DFAC); }}
        >
          <FontAwesome6 name="burger" size={32} color="#e53935" style={styles.InfoLogo} />
          <View style={styles.InfoText}>
            <Text style={styles.InfoTitle}>DFAC</Text>
            <Text style={styles.InfoDetail}>Main · Thunder · Argonne · Hovey</Text>
          </View>
          {/* 🔹 메뉴 버튼 → 모달 open */}
          <TouchableOpacity
            style={styles.InfoButton}
            onPress={() => setShowDFACMenu(true)}
          >
            <Text style={styles.InfoButtonText}>menu</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {InfoTime_DFAC && (
          <View style={styles.InfoDetailBox}>
            <View style={styles.InfoDetailHeaderRow}>
              <Text style={[styles.InfoDetailHeader, { flex: 1 }]}>Meal</Text>
              <Text style={[styles.InfoDetailHeader, { flex: 1, textAlign: 'center' }]}>Weekdays</Text>
              <Text style={[styles.InfoDetailHeader, { flex: 1, textAlign: 'center' }]}>Holidays</Text>
            </View>

            <View style={styles.InfoDetailRow}>
              <Text style={[styles.InfoDetailLabel, { flex: 1 }]}>Breakfast</Text>
              <Text style={[styles.InfoDetailText, { flex: 1, textAlign: 'center' }]}>0730–0900</Text>
              <Text style={[styles.InfoDetailText, { flex: 1, textAlign: 'center' }]}>–</Text>
            </View>

            <View style={styles.InfoDetailRow}>
              <Text style={[styles.InfoDetailLabel, { flex: 1 }]}>Lunch</Text>
              <Text style={[styles.InfoDetailText, { flex: 1, textAlign: 'center' }]}>1130–1300</Text>
              <Text style={[styles.InfoDetailText, { flex: 1, textAlign: 'center' }]}>–</Text>
            </View>

            <View style={styles.InfoDetailRow}>
              <Text style={[styles.InfoDetailLabel, { flex: 1 }]}>Brunch</Text>
              <Text style={[styles.InfoDetailText, { flex: 1, textAlign: 'center' }]}>–</Text>
              <Text style={[styles.InfoDetailText, { flex: 1, textAlign: 'center' }]}>0930–1300</Text>
            </View>

            <View style={styles.InfoDetailRow}>
              <Text style={[styles.InfoDetailLabel, { flex: 1 }]}>Dinner</Text>
              <Text style={[styles.InfoDetailText, { flex: 1, textAlign: 'center' }]}>1700–1830</Text>
              <Text style={[styles.InfoDetailText, { flex: 1, textAlign: 'center' }]}>1700–1830</Text>
            </View>
          </View>
        )}

      {/* KATUSA Snack Bar */}
      <TouchableOpacity style={styles.InfoBox} onPress={() => { setInfoTime_KSB(!InfoTime_KSB); }}>
        <FontAwesome6 name="bowl-rice" size={32} color="#ff7043" style={styles.InfoLogo} />
        <View style={styles.InfoText}>
          <Text style={styles.InfoTitle}>KATUSA Snack Bar</Text>
          <Text style={styles.InfoDetail}>Canteen · Thunder · Shortie · Dragon Valley · Hovey</Text>
        </View>
      </TouchableOpacity>
      {InfoTime_KSB && (
        <View style={styles.InfoDetailBox}>
          <View style={styles.InfoDetailHeaderRow}>
            <Text style={[styles.InfoDetailHeader, { flex: 1 }]}>Location</Text>
            <Text style={[styles.InfoDetailHeader, { flex: 1, textAlign: 'center' }]}>Weekdays</Text>
            <Text style={[styles.InfoDetailHeader, { flex: 1, textAlign: 'center' }]}>Holidays</Text>
          </View>


          <View style={styles.InfoDetailRow}>
              <Text style={[styles.InfoDetailLabel, { flex: 1 }]}>Canteen</Text>
              <Text style={[styles.InfoDetailText, { flex: 1, textAlign: 'center' }]}>?</Text>
              <Text style={[styles.InfoDetailText, { flex: 1, textAlign: 'center' }]}>?</Text>
          </View>

          <View style={styles.InfoDetailRow}>
              <Text style={[styles.InfoDetailLabel, { flex: 1 }]}>Thunder</Text>
              <Text style={[styles.InfoDetailText, { flex: 1, textAlign: 'center' }]}>?</Text>
              <Text style={[styles.InfoDetailText, { flex: 1, textAlign: 'center' }]}>?</Text>
          </View>

          <View style={styles.InfoDetailRow}>
              <Text style={[styles.InfoDetailLabel, { flex: 1 }]}>Shortie</Text>
              <Text style={[styles.InfoDetailText, { flex: 1, textAlign: 'center' }]}>?</Text>
              <Text style={[styles.InfoDetailText, { flex: 1, textAlign: 'center' }]}>?</Text>
          </View>

          <View style={styles.InfoDetailRow}>
              <Text style={[styles.InfoDetailLabel, { flex: 1 }]}>Dragon Valley</Text>
              <Text style={[styles.InfoDetailText, { flex: 1, textAlign: 'center' }]}>1000–1920</Text>
              <Text style={[styles.InfoDetailText, { flex: 1, textAlign: 'center' }]}>Random</Text>
          </View>

          <View style={styles.InfoDetailRow}>
              <Text style={[styles.InfoDetailLabel, { flex: 1 }]}>Hovey</Text>
              <Text style={[styles.InfoDetailText, { flex: 1, textAlign: 'center' }]}>?</Text>
              <Text style={[styles.InfoDetailText, { flex: 1, textAlign: 'center' }]}>?</Text>
          </View>
        </View>
      )}

      {/* Barber Shop */}
      <TouchableOpacity style={styles.InfoBox} onPress={() => { setInfoTime_BarborShop(!InfoTime_BarberShop); }}>
        <FontAwesome6 name="scissors" size={32} color="#fbc02d" style={styles.InfoLogo} />
        <View style={styles.InfoText}>
          <Text style={styles.InfoTitle}>Barber Shop</Text>
          <Text style={styles.InfoDetail}>Haircut & Grooming</Text>
        </View>
      </TouchableOpacity>
      {InfoTime_BarberShop && (
        <View style={styles.InfoDetailBox}>
          <View style={styles.InfoDetailHeaderRow}>
            <Text style={[styles.InfoDetailHeader, { flex: 1 }]}>Day</Text>
            <Text style={[styles.InfoDetailHeader, { flex: 2, textAlign: 'center' }]}>Hours</Text>
          </View>

          <View style={styles.InfoDetailRow}>
            <Text style={[styles.InfoDetailLabel, { flex: 1 }]}>MON–FRI</Text>
            <Text style={[styles.InfoDetailText, { flex: 2, textAlign: 'center' }]}>1000–1900</Text>
          </View>

          <View style={styles.InfoDetailRow}>
            <Text style={[styles.InfoDetailLabel, { flex: 1 }]}>SAT</Text>
            <Text style={[styles.InfoDetailText, { flex: 2, textAlign: 'center' }]}>1000–1800</Text>
          </View>

          <View style={styles.InfoDetailRow}>
            <Text style={[styles.InfoDetailLabel, { flex: 1 }]}>SUN</Text>
            <Text style={[styles.InfoDetailText, { flex: 2, textAlign: 'center' }]}>1000–1900</Text>
          </View>
        </View>
      )}

      {/* Gym */}
      <TouchableOpacity style={styles.InfoBox} onPress={() => { setInfoTime_GYM(!InfoTime_GYM); }}>
        <FontAwesome6 name="dumbbell" size={25} color="#42a5f5" style={styles.InfoLogo} />
        <View style={styles.InfoText}>
          <Text style={styles.InfoTitle}>Gym</Text>
          <Text style={styles.InfoDetail}>Hanson · Carrey · Hovey</Text>
        </View>
      </TouchableOpacity>
      {InfoTime_GYM && (
        <View style={styles.InfoDetailBox}>
          <View style={styles.InfoDetailHeaderRow}>
            <Text style={[styles.InfoDetailHeader, { flex: 1 }]}>Day</Text>
            <Text style={[styles.InfoDetailHeader, { flex: 2, textAlign: 'center' }]}>Hours</Text>
          </View>

          <View style={styles.InfoDetailRow}>
            <Text style={[styles.InfoDetailLabel, { flex: 1 }]}>MON–FRI</Text>
            <Text style={[styles.InfoDetailText, { flex: 2, textAlign: 'center' }]}>TBD</Text>
          </View>
          <View style={styles.InfoDetailRow}>
            <Text style={[styles.InfoDetailLabel, { flex: 1 }]}>SAT</Text>
            <Text style={[styles.InfoDetailText, { flex: 2, textAlign: 'center' }]}>TBD</Text>
          </View>
          <View style={styles.InfoDetailRow}>
            <Text style={[styles.InfoDetailLabel, { flex: 1 }]}>SUN</Text>
            <Text style={[styles.InfoDetailText, { flex: 2, textAlign: 'center' }]}>TBD</Text>
          </View>
        </View>
      )}

      {/* CAC */}
      <TouchableOpacity style={styles.InfoBox} onPress={() => { setInfoTime_CAC(!InfoTime_CAC); }}>
        <FontAwesome6 name="gamepad" size={27} color="#4caf50" style={styles.InfoLogo} />
        <View style={styles.InfoText}>
          <Text style={styles.InfoTitle}>CAC</Text>
          <Text style={styles.InfoDetail}>Casey · Hovey</Text>
        </View>
      </TouchableOpacity>
      {InfoTime_CAC && (
        <View style={styles.InfoDetailBox}>
          <View style={styles.InfoDetailHeaderRow}>
            <Text style={[styles.InfoDetailHeader, { flex: 1 }]}>Day</Text>
            <Text style={[styles.InfoDetailHeader, { flex: 2, textAlign: 'center' }]}>Hours</Text>
          </View>

          <View style={styles.InfoDetailRow}>
            <Text style={[styles.InfoDetailLabel, { flex: 1 }]}>MON–SAT</Text>
            <Text style={[styles.InfoDetailText, { flex: 2, textAlign: 'center' }]}>0900–2100</Text>
          </View>
          <View style={styles.InfoDetailRow}>
            <Text style={[styles.InfoDetailLabel, { flex: 1 }]}>SUN</Text>
            <Text style={[styles.InfoDetailText, { flex: 2, textAlign: 'center' }]}>1000–1900</Text>
          </View>
        </View>
      )}

      {/* USO */}
      <TouchableOpacity style={styles.InfoBox} onPress={() => { setInfoTime_USO(!InfoTime_USO); }}>
        <FontAwesome6 name="rocket" size={35} color="#5575f7ff" style={styles.InfoLogo} />
        <View style={styles.InfoText}>
          <Text style={styles.InfoTitle}>USO</Text>
          <Text style={styles.InfoDetail}>Casey</Text>
        </View>
      </TouchableOpacity>
      {InfoTime_USO && (
        <View style={styles.InfoDetailBox}>
          <View style={styles.InfoDetailHeaderRow}>
            <Text style={[styles.InfoDetailHeader, { flex: 1 }]}>Day</Text>
            <Text style={[styles.InfoDetailHeader, { flex: 2, textAlign: 'center' }]}>Hours</Text>
          </View>

          <View style={styles.InfoDetailRow}>
            <Text style={[styles.InfoDetailLabel, { flex: 1 }]}>MON–SAT</Text>
            <Text style={[styles.InfoDetailText, { flex: 2, textAlign: 'center' }]}>0900–1800</Text>
          </View>
          <View style={styles.InfoDetailRow}>
            <Text style={[styles.InfoDetailLabel, { flex: 1 }]}>SUN</Text>
            <Text style={[styles.InfoDetailText, { flex: 2, textAlign: 'center' }]}>1000–1700</Text>
          </View>
        </View>
      )}

      {/* Library */}
      <TouchableOpacity style={styles.InfoBox} onPress={() => { setInfoTime_Library(!InfoTime_Library); }}>
        <FontAwesome6 name="book-open" size={27} color="#ba68c8" style={[styles.InfoLogo, { marginLeft: 8 }]} />
        <View style={styles.InfoText}>
          <Text style={styles.InfoTitle}>Library</Text>
          <Text style={styles.InfoDetail}>Casey · Hovey</Text>
        </View>
      </TouchableOpacity>
      {InfoTime_Library && (
        <View style={styles.InfoDetailBox}>
          <View style={styles.InfoDetailHeaderRow}>
            <Text style={[styles.InfoDetailHeader, { flex: 1 }]}>Day</Text>
            <Text style={[styles.InfoDetailHeader, { flex: 2, textAlign: 'center' }]}>Hours</Text>
          </View>

          <View style={styles.InfoDetailRow}>
            <Text style={[styles.InfoDetailLabel, { flex: 1 }]}>MON–SAT</Text>
            <Text style={[styles.InfoDetailText, { flex: 2, textAlign: 'center' }]}>1000–1900</Text>
          </View>
          <View style={styles.InfoDetailRow}>
            <Text style={[styles.InfoDetailLabel, { flex: 1 }]}>SUN</Text>
            <Text style={[styles.InfoDetailText, { flex: 2, textAlign: 'center' }]}>Closed</Text>
          </View>
        </View>
      )}
<Text style={styles.footer}>
          © {new Date().getFullYear()} CaseyBus · Built with respect for the Camp Casey community.
        </Text>
      </ScrollView>
    </>
  );
}

// 아래 styles는 네가 보내준 거에서 modal 쪽만 추가
const CARD_BG = "#fff";
const TEXT = "rgba(56, 56, 56, 1)";
const MUTED = "#919191ff";
const LIGHT_BLUE = "#338AE0";
const LIGHT_GRAY = "#0000002f";

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f7f6',
    paddingTop: 50,
    paddingBottom: 30,
  },
  header: { alignItems: "center", marginTop: 8, marginBottom: 18 },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: LIGHT_BLUE,
  },
  title: { marginTop: 10, fontSize: 20, fontWeight: "700", color: TEXT, letterSpacing: 0.5 },
  subtitle: { marginTop: 4, fontSize: 12, color: MUTED },

  InfoBox: {
    backgroundColor: CARD_BG,
    marginLeft: 20,
    marginRight: 20,
    height: 120,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: LIGHT_GRAY,
    flexDirection: 'row',
    alignItems: 'center',
  },
  InfoLogo: {
    marginLeft: 8,
    marginRight: 12,
  },
  InfoText: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  InfoTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#383838ff',
  },
  InfoDetail: {
    width: 245,
    fontSize: 11,
    fontWeight: '300',
    color: TEXT,
  },

  InfoDetailBox: {
    marginHorizontal: 20,
    marginBottom: 14,
    borderRadius: 14,
    backgroundColor: '#e6e6e6ff',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  InfoDetailHeaderRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  InfoDetailHeader: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4b4b4bff',
  },
  InfoDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  InfoDetailLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4b4b4bff',
  },
  InfoDetailText: {
    fontSize: 12,
    color: '#4b4b4bff',
  },

  InfoButton: {
    backgroundColor: LIGHT_BLUE,
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  InfoButtonText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '500',
  },

  footer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    textAlign: "center",
    fontSize: 11.5,
    color: MUTED,
    opacity: 0.9,
  },

  
  // 🔹 모달 스타일
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContent: {
    maxHeight: '70%',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT,
  },
});