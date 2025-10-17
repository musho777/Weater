import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../core/theme';
import LottieView from 'lottie-react-native';

const WeatherCard = ({ weather, onPress }) => {
  const temperature = Math.round(weather.current?.temp_c);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <LottieView
        source={require('../../assets/RainyDay.json')}
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
          width: 300,
          height: 300,
        }}
      />

      <View style={styles.header}>
        <Text style={styles.cityName}>{weather.location.name}</Text>
      </View>

      <View style={styles.temperatureContainer}>
        <Text style={styles.temperature}>{temperature}</Text>
        <Text style={[styles.temperature, { fontSize: 24, color: '#f6d14b' }]}>
          °
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: -40,
  },
  cityName: {
    ...typography.h2,
    color: colors.text,
  },
  temperatureContainer: {
    flexDirection: 'row',
  },
  temperature: {
    fontSize: 86,
    fontWeight: '900',
    color: colors.text,
  },
  detailsContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  description: {
    ...typography.body,
    color: colors.text,
    textTransform: 'capitalize',
    marginBottom: spacing.xs,
  },
  feelsLike: {
    ...typography.small,
    color: colors.textLight,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.gray,
    paddingTop: spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    ...typography.small,
    color: colors.textLight,
    marginBottom: spacing.xs,
  },
  statValue: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
});

export default WeatherCard;
