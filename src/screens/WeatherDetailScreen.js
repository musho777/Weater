import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../core/theme';

const WeatherDetailScreen = ({ route }) => {
  const { weather } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.cityName}>{weather.name}</Text>
        {/* <Text style={styles.temperature}>
          {Math.round(weather.main.temp)}°C
        </Text> */}
        {/* <Text style={styles.description}>{weather.weather[0].description}</Text> */}
      </View>

      <View style={styles.detailsContainer}>
        {/* <DetailRow
          label="Feels Like"
          value={`${Math.round(weather.main.feels_like)}°C`}
        /> */}
        {/* <DetailRow label="Humidity" value={`${weather.main.humidity}%`} />
        <DetailRow label="Wind Speed" value={`${weather.wind.speed} m/s`} />
        <DetailRow label="Pressure" value={`${weather.main.pressure} hPa`} /> */}
        {/* <DetailRow
          label="Visibility"
          value={`${weather.visibility / 1000} km`}
        /> */}
        {/* <DetailRow label="Cloudiness" value={`${weather.clouds.all}%`} /> */}
      </View>
    </ScrollView>
  );
};

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    padding: spacing.xl,
    alignItems: 'center',
  },
  cityName: {
    ...typography.h1,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  temperature: {
    fontSize: 48,
    fontWeight: '300',
    color: colors.white,
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.h3,
    color: colors.white,
    textTransform: 'capitalize',
  },
  detailsContainer: {
    padding: spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  detailLabel: {
    ...typography.body,
    color: colors.textLight,
  },
  detailValue: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
});

export default WeatherDetailScreen;
