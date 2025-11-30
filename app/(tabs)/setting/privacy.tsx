import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function PrivacyScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.title}>Privacy Policy</Text>

        <Text style={styles.paragraph}>
          This privacy policy applies to the CaseyBus app (hereby referred to as
          "Application") for mobile devices that was created by the Service
          Provider as a Free service. This service is intended for use "AS IS".
        </Text>

        <Text style={styles.section}>Information Collection and Use</Text>

        <Text style={styles.paragraph}>
          The Application collects information when you download and use it. This
          information may include:
        </Text>

        <Text style={styles.list}>• Your device's Internet Protocol address (IP address)</Text>
        <Text style={styles.list}>• The pages of the Application that you visit</Text>
        <Text style={styles.list}>• The time and date of your visit</Text>
        <Text style={styles.list}>• Time spent on those pages</Text>
        <Text style={styles.list}>• Time spent on the Application</Text>
        <Text style={styles.list}>• Mobile operating system information</Text>

        <Text style={styles.paragraph}>
          The Application does not gather precise information about the location
          of your mobile device.
        </Text>

        <Text style={styles.paragraph}>
          The Service Provider may use the information you provide to contact you
          with important notices and updates.
        </Text>

        <Text style={styles.section}>Third Party Access</Text>

        <Text style={styles.paragraph}>
          Only aggregated, anonymized data is periodically transmitted to external
          services to help improve the Application.
        </Text>

        <Text style={styles.paragraph}>
          Please note that the Application utilizes third-party services that have
          their own Privacy Policies:
        </Text>

        <Text style={styles.link}>• Expo: https://expo.io/privacy</Text>

        <Text style={styles.section}>Opt-Out Rights</Text>

        <Text style={styles.paragraph}>
          You can stop all collection of information by uninstalling the
          Application.
        </Text>

        <Text style={styles.section}>Data Retention Policy</Text>

        <Text style={styles.paragraph}>
          The Service Provider will retain User Provided data as long as you use
          the Application and for a reasonable time thereafter.
        </Text>

        <Text style={styles.paragraph}>
          To request deletion of your data, please contact:
        </Text>

        <Text style={styles.link}>yaegun.kim@wsu.edu</Text>

        <Text style={styles.section}>Children</Text>

        <Text style={styles.paragraph}>
          The Application does not knowingly collect personal information from
          children under 13 years of age.
        </Text>

        <Text style={styles.section}>Security</Text>

        <Text style={styles.paragraph}>
          The Service Provider works to protect your data with physical,
          electronic, and procedural safeguards.
        </Text>

        <Text style={styles.section}>Changes</Text>

        <Text style={styles.paragraph}>
          This Privacy Policy may be updated from time to time. Continued use of
          the Application constitutes acceptance of any changes.
        </Text>

        <Text style={styles.paragraph}>
          Effective Date: 2025-11-21
        </Text>

        <Text style={styles.section}>Your Consent</Text>

        <Text style={styles.paragraph}>
          By using the Application, you consent to the processing of your
          information as described in this Privacy Policy.
        </Text>

        <Text style={styles.section}>Contact Us</Text>

        <Text style={styles.paragraph}>
          If you have questions about privacy while using the Application:
        </Text>

        <Text style={styles.link}>yaegun.kim@wsu.edu</Text>

        <View style={styles.footer}>
          <Text style={styles.smallText}>
            Privacy Policy generated using App Privacy Policy Generator
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7f6' },
  scroll: { padding: 18 },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  section: {
    fontSize: 20,
    marginTop: 18,
    marginBottom: 6,
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
  list: {
    fontSize: 16,
    marginLeft: 12,
    marginBottom: 6,
  },
  link: {
    fontSize: 16,
    color: '#1E88E5',
    marginBottom: 12,
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 10,
  },
  smallText: {
    fontSize: 12,
    color: '#777',
  },
});
