import {
  View,
  Text,
  Modal as ModalRN,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {Colors} from '../utils/colors';
import {useSelector} from 'react-redux';
import {selectSimon} from '../store/simonSlice';
import {INPUT_MODAL, SAVE_MODAL, SCORE_TABLE_KEY} from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScoreEntry, updateScoreTable} from '../utils/storage';

interface ModalProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  setScoreTable: Dispatch<SetStateAction<ScoreEntry[]>>;
}

const Modal = ({modalVisible, setModalVisible, setScoreTable}: ModalProps) => {
  const [playerName, setPlayerName] = useState<string>('');
  const {score} = useSelector(selectSimon);

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

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleInputChange = (text: string) => {
    setPlayerName(text);
  };

  const handleSubmit = async () => {
    await updateScoreTable(playerName, score);
    await fetchScoreTable();
    closeModal();
  };
  return (
    <ModalRN animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.container}>
        <View style={styles.container_content}>
          <View style={{width: '80%'}}>
            <Text style={[styles.text, styles.text_input_header]}>
              {INPUT_MODAL}
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={handleInputChange}
              value={playerName}
            />
          </View>
          <TouchableOpacity
            disabled={!playerName}
            onPress={handleSubmit}
            hitSlop={10}
            style={[styles.btn, !playerName && styles.disabled]}>
            <Text style={styles.text}>{SAVE_MODAL}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalRN>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_content: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '30%',
    borderWidth: 1,
    borderColor: Colors.black,
  },
  text: {
    color: Colors.black,
    fontWeight: 'bold',
  },
  text_input_header: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: Colors.black,
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    borderRadius: 8,
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 14,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.black,
  },
  disabled: {
    backgroundColor: Colors.gray,
  },
});

export default Modal;
