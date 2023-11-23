import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {selectSimon} from '../store/simonSlice';
import {Colors} from '../utils/colors';
import {SCORE_TABLE_KEY} from '../utils/constants';
import {ScoreEntry, updateScoreTable} from '../utils/storage';

const ResultScreen = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const [playerName, setPlayerName] = useState<string>('');
  const {score} = useSelector(selectSimon);

  const [scoreTable, setScoreTable] = useState<ScoreEntry[]>([]);

  const fetchScoreTable = async () => {
    try {
      const scoreTableString = await AsyncStorage.getItem(SCORE_TABLE_KEY);
      const scoreTableData: ScoreEntry[] = scoreTableString
        ? JSON.parse(scoreTableString)
        : [];

      setScoreTable(scoreTableData);
    } catch (error) {
      console.error('Error fetching score table:', error);
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleInputChange = (text: string) => {
    setPlayerName(text);
  };

  const handleSubmit = async () => {
    updateScoreTable(playerName, score);
    await fetchScoreTable();
    closeModal();
  };

  const renderScoreItem = ({item}: {item: ScoreEntry}) => (
    <View style={styles.scoreItem}>
      <Text>{item.name}</Text>
      <Text>{item.score}</Text>
    </View>
  );

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Open Modal" onPress={openModal} />
      {!modalVisible && (
        <View style={styles.container}>
          <Text style={styles.title}>Top 10 Scores</Text>
          <FlatList
            data={scoreTable}
            keyExtractor={(item, index) => `${item.name}_${index}`}
            renderItem={renderScoreItem}
          />
        </View>
      )}

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: Colors.white,
              padding: 20,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              width: '80%',
              height: '30%',
              borderWidth: 1,
              borderColor: Colors.black,
            }}>
            <View style={{width: '80%'}}>
              <Text
                style={{
                  color: Colors.black,
                  fontWeight: 'bold',
                  fontSize: 14,
                  marginBottom: 5,
                }}>
                Enter Player Name:
              </Text>
              <TextInput
                style={{
                  height: 40,
                  borderColor: Colors.black,
                  borderWidth: 1,
                  marginBottom: 10,
                  padding: 5,
                  borderRadius: 8,
                  color: Colors.black,
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
                onChangeText={handleInputChange}
                value={playerName}
              />
            </View>
            <TouchableOpacity
              onPress={handleSubmit}
              hitSlop={10}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '80%',
                height: 50,
                marginTop: 20,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: Colors.black,
              }}>
              <Text>Submut</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scoreItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ResultScreen;
