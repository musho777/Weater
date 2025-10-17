import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { colors, spacing, typography } from '../core/theme';
import WeatherService from '../services/weather/WeatherService';
import WeatherCard from '../shared/components/WeatherCard';
import { WordSvg } from '../assets/svg';
import LottieView from 'lottie-react-native';

const HomeScreen = ({ navigation }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      setError(null);
      const data = await WeatherService.getCurrentWeather('Yerevan');
      setWeather(data);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  useEffect(() => {
    fetchWeather();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchWeather();
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchWeather}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ gap: 10 }}>
        <Text style={styles.dateText}>17 OCt 2025</Text>
        <Text style={styles.locationText}>
          Armenia,
          <Text style={styles.dateText}> Yerevan</Text>
        </Text>
      </View>
      <View style={{ position: 'relative' }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            top: 40,
            position: 'absolute',
          }}
        >
          <WordSvg />
        </View>
        {weather && (
          <WeatherCard
            weather={weather}
            onPress={() => navigation.navigate('WeatherDetail', { weather })}
          />
        )}
      </View>
      <View style={styles.forecast}>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column',
            width: '30%',
          }}
        >
          <LottieView
            source={require('../assets/Weather-snow.json')}
            autoPlay
            loop
            colorFilters={[
              {
                keypath: '*',
                color: '#FFFFFF', // white
              },
            ]}
            style={{
              borderColor: 'white',
              width: 60,
              height: 60,
            }}
          />
          <View
            style={{
              marginTop: 10,
              justifyContent: 'center',
              gap: 5,
              alignItems: 'center',
            }}
          >
            <Text style={styles.timeText}>00:00</Text>
            <Text style={styles.degreeText}>11 *</Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column',
            width: '30%',
          }}
        >
          <LottieView
            source={require('../assets/Rainy.json')}
            autoPlay
            loop
            colorFilters={[
              {
                keypath: '*',
                color: '#FFFFFF', // white
              },
            ]}
            style={{
              borderColor: 'white',
              width: 70,
              height: 70,
            }}
          />
          <View
            style={{
              marginTop: -10,
              justifyContent: 'center',
              gap: 5,
              alignItems: 'center',
            }}
          >
            <Text style={styles.timeText}>00:00</Text>
            <Text style={styles.degreeText}>11 *</Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '30%',
          }}
        >
          <LottieView
            source={require('../assets/Weather-storm.json')}
            autoPlay
            loop
            colorFilters={[
              {
                keypath: '*',
                color: '#FFFFFF', // white
              },
            ]}
            style={{
              borderColor: 'white',
              width: 60,
              height: 60,
            }}
          />
          <View
            style={{
              marginTop: 5,
              justifyContent: 'center',
              gap: 5,
              alignItems: 'center',
            }}
          >
            <Text style={styles.timeText}>00:00</Text>
            <Text style={styles.degreeText}>11 *</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '300',
    color: colors.text,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.gray,
  },
  degreeText: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.gray,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.text,
  },

  centerContainer: {
    flex: 1,
  },
  header: {
    alignItems: 'flex-end',
  },
  searchButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  searchButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
  errorText: {
    color: colors.error,
    ...typography.body,
    marginBottom: spacing.md,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  retryText: {
    color: colors.white,
    fontWeight: '600',
  },
  forecast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
});

export default HomeScreen;
