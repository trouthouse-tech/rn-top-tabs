import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Tabs} from './Tabs';

const TABS = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5'];

export const App = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  return (
    <View>
      <Tabs items={TABS} onChange={setSelectedTab} />
      {selectedTab === 0 && <TabOne />}
      {selectedTab === 1 && <TabTwo />}
      {selectedTab === 2 && <TabThree />}
      {selectedTab === 3 && <TabFour />}
      {selectedTab === 4 && <TabFive />}
    </View>
  )
};

const TabOne = () => {
  return (
    <View>
      <Text>Tab One</Text>
    </View>
  );
};

const TabTwo = () => {
  return (
    <View>
      <Text>Tab Two</Text>
    </View>
  );
};

const TabThree = () => {
  return (
    <View>
      <Text>Tab Three</Text>
    </View>
  );
};

const TabFour = () => {
  return (
    <View>
      <Text>Tab Four</Text>
    </View>
  );
};

const TabFive = () => {
  return (
    <View>
      <Text>Tab Five</Text>
    </View>
  );
};
