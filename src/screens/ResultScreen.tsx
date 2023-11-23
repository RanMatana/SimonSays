import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {RootStackParamList} from '../../App';
import Modal from '../components/Modal';
import {resetGame} from '../store/simonSlice';
import {Colors} from '../utils/colors';
import {
  BACK_RESULT_SCREEN,
  NUMBER_RESULT_SCREEN,
  PLAYER_RESULT_SCREEN,
  SCORE_RESULT_SCREEN,
  TITLE_RESULT_SCREEN,
} from '../utils/constants';
import {ScoreEntry} from '../utils/storage';

type ResultScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ResultScreen'
>;

interface ResultScreenProps {
  navigation: ResultScreenNavigationProp;
}

const ResultScreen = ({navigation}: ResultScreenProps) => {
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const [scoreTable, setScoreTable] = useState<ScoreEntry[]>([]);

  const renderScoreItem = ({
    item,
    index,
  }: {
    item: ScoreEntry;
    index: number;
  }) => (
    <View style={styles.scoreItem}>
      <Text style={styles.text}>
        {NUMBER_RESULT_SCREEN} {index + 1}
      </Text>
      <Text style={styles.text}>
        {PLAYER_RESULT_SCREEN} {item.name}
      </Text>
      <Text style={styles.text}>
        {SCORE_RESULT_SCREEN} {item.score}
      </Text>
    </View>
  );

  useEffect(() => {
    dispatch(resetGame());
  }, [dispatch]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {!modalVisible && (
        <View style={styles.container}>
          <Text style={[styles.title, {textAlign: 'center'}]}>
            {TITLE_RESULT_SCREEN}
          </Text>
          <FlatList
            data={scoreTable}
            keyExtractor={(item, index) => `${item.name}_${index}`}
            renderItem={renderScoreItem}
          />
          <TouchableOpacity
            style={styles.btn}
            hitSlop={10}
            onPress={() => navigation.goBack()}>
            <Text style={styles.text}>{BACK_RESULT_SCREEN}</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setScoreTable={setScoreTable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.black,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  scoreItem: {
    alignSelf: 'center',
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  btn: {
    width: '80%',
    height: 50,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.black,
  },
});

export default ResultScreen;
