import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, TouchableOpacity, Image } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';

import useFlashingText from '@/hooks/useFlashingText';
import { styles } from './DetailsScreen.styles';

const DetailsScreen = () => {
  const { time } = useLocalSearchParams();

  // State to control the visibility of the enlarged QR code
  const [showLargeQRCode, setShowLargeQRCode] = useState(false);
  // Animation for the opacity of the enlarged QR code
  const largeQRCodeOpacity = useRef(new Animated.Value(0)).current;

  // Handling the 'flashing/fading' of the text set to a 1-second duration
  const opacity = useFlashingText(1000);

  // Format the Date and Time as they appear on the official app
  const currentDate = new Date();
  const formattedTime = formatTime(time, currentDate);
  const formattedDate = formatDate(currentDate);

  /**
   * Pressing on the QR code when it is small should enlarge it
   * and cover the details section with a white background. This should
   * fade in, in around 1 ms.
   */
  const handleSmallQRPress = () => {
    setShowLargeQRCode(true);
    Animated.timing(largeQRCodeOpacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  /**
   * Pressing on the QR code when it is large should make it small again
   * and show the details section. It should fade out in about 1 ms.
   */
  const handleEnlargedQRPress = () => {
    Animated.timing(largeQRCodeOpacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => setShowLargeQRCode(false));
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/videos/caltrainbackground.mp4')}
        rate={1.0}
        volume={1.0}
        isMuted={true}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        isLooping
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.whiteBox}>
        <View style={styles.textContainer}>
          <Animated.Text style={[styles.text, { opacity }]}>
            {formattedTime}
          </Animated.Text>
          <Animated.Text style={[styles.text, { opacity }]}>
            {formattedDate}
          </Animated.Text>
        </View>
      </View>

      {/* Clickable area to trigger the appearance of the larger QR code */}
      <TouchableOpacity onPress={handleSmallQRPress} style={styles.clickableArea}/>

      {/* Enlarged QR code with white background covering details */}
      {showLargeQRCode && (
        <TouchableOpacity activeOpacity={1} onPress={handleEnlargedQRPress}>
            <Animated.View style={[styles.largeWhiteBox, { opacity: largeQRCodeOpacity }]}>
                {returnRandomQRCodeImage()}
            </Animated.View>
        </TouchableOpacity>
      )}
    </View>
  );
};

/**
 * On the official CalTrain Mobile Application, the time appears in the format: 
 * hour:minute:second {AM | PM} with no trailing zero on the hour. 
 * For example if the ticket was purchased at 7:56 PM and 49 seconds 
 * the format would be: 7:56:49 PM. We set a random constant second value so 
 * it does not have to be inputted by the user.
 * 
 * @param time The time inputted by the user
 * @param currentDate The current date to compute whether we are in AM or PM
 * @returns The formatted time
 */
const formatTime = (time: string | string[], currentDate: Date) => {
    const period = currentDate.getHours() >= 12 ? 'PM' : 'AM';
    const randomSecond = '02';
    return time + ':' + randomSecond + ' ' + period;
}

/**
 * On the official CalTrain Mobile Application, the date appears in the format:
 * MM/DD/YY. For example, if the ticket was purchased on August 11th, 2001
 * the format would be: 08/11/01.
 * 
 * @param currentDate The date of ticket purchase to format
 * @returns The formatted date
 */
const formatDate = (currentDate: Date) => {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
      }).format(currentDate);
    return formattedDate;
}

/**
 * The QR code will randomly change for security purposes. We pick from a 
 * few images at random each time the QR code is enlarged to mimic this change.
 * 
 * @returns An image element of one of the stored QR codes
 */
const returnRandomQRCodeImage = () => {
    const qrCodeImages = [
        require('../assets/images/caltrain_qr_code_0.png'),
        require('../assets/images/caltrain_qr_code_1.png'),
        require('../assets/images/caltrain_qr_code_2.png'),
    ];

    const randomNumber = Math.floor(Math.random() * qrCodeImages.length);

    return <Image source={qrCodeImages[randomNumber]} style={styles.image} />;
}

export default DetailsScreen;
