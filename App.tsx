import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  ScrollView,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const manager = new BleManager();

export default function App() {
  const [isAdvertising, setIsAdvertising] = useState(false);
  const [uuid, setUuid] = useState('de5682c1-956e-44fc-b963-88bfc5240ff2');
  const [major, setMajor] = useState('100');
  const [minor, setMinor] = useState('40004');
  const [measuredPower, setMeasuredPower] = useState('-59');
  const [vericiGucu, setVericiGucu] = useState('Orta');

  useEffect(() => {
    requestPermissions();
    return () => {
      manager.destroy();
    };
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
    }
  };

  const toggleAdvertising = async (value: boolean) => {
    setIsAdvertising(value);
    if (value) {
      // Not: Android'de tam peripheral/advertising modu cihaz yongasına bağlıdır.
      // react-native-ble-plx temel olarak tarama (central) odaklıdır, 
      // ancak alt seviye modül aktif edilerek durum yönetilir.
      Alert.alert('Bilgi', 'BLE tarama/bağlantı modu hazır.');
    } else {
      Alert.alert('Bilgi', 'Durduruldu.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>Sensör Ayarları</Text>

      <View style={styles.settingItem}>
        <Text style={styles.label}>Reklam modu</Text>
        <Text style={styles.subLabel}>Düşük gecikme (10Hz)</Text>
      </View>

      <View style={styles.rowItem}>
        <View>
          <Text style={styles.label}>Vericiyi etkinleştir</Text>
          <Text style={styles.subLabel}>Sürekli arka plan yayını</Text>
        </View>
        <Switch
          value={isAdvertising}
          onValueChange={toggleAdvertising}
          trackColor={{ false: '#767577', true: '#0091EA' }}
          thumbColor={isAdvertising ? '#fff' : '#f4f3f4'}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>UUID</Text>
        <TextInput
          style={styles.input}
          value={uuid}
          onChangeText={setUuid}
          placeholder="UUID giriniz"
          placeholderTextColor="#888"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ana (Major)</Text>
        <TextInput
          style={styles.input}
          value={major}
          onChangeText={setMajor}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Minör (Minor)</Text>
        <TextInput
          style={styles.input}
          value={minor}
          onChangeText={setMinor}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ölçülen güç</Text>
        <TextInput
          style={styles.input}
          value={measuredPower}
          onChangeText={setMeasuredPower}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.label}>Verici gücü</Text>
        <Text style={styles.subLabel}>{vericiGucu}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212',
    flexGrow: 1,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00B0FF',
    marginBottom: 20,
  },
  settingItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    paddingBottom: 10,
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    paddingBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  subLabel: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 2,
  },
  inputContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    paddingBottom: 10,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 10,
    borderRadius: 6,
    marginTop: 5,
    fontSize: 14,
  },
});