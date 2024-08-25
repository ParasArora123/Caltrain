import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    position: 'absolute',
    top: 160,
    width: width * 0.73,
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  clickableArea: {
    position: 'absolute',
    top: 290,
    left: width * 0.64,
    width: 100,
    height: 70,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  largeWhiteBox: {
    position: 'absolute',
    top: -220,
    left: width * -.35,
    width: '70%',
    height: 250,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: '93%',
    resizeMode: 'contain',
  },
});
