import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  onChange: (index: number) => void;
  items: string[];
};

export const Tabs = (props: Props) => {
  const {onChange, items = []} = props;
  const [activeTab, setActiveTab] = useState(0);

  const scrollRef = useRef<ScrollView | null>(null);

  const handleTabChange = useCallback(
    (index: number) => {
      setActiveTab(index);
      onChange(index);

      if (scrollRef.current) {
        /**
         * If you have a lot of tabs, then you need to make sure that tabs on the edges
         * are shown as the User scrolls through the tabs.
         *
         * Without this logic, the final tabs may never be pressed on unless the User
         * knows to manually scroll to the end of the tabs list.
         */
        if (index > 2) {
          // Scroll to the 'end' of the tabs list
          scrollRef.current.scrollToEnd({animated: true});
        } else {
          // Scroll to the 'start' of the tabs list
          scrollRef.current.scrollTo({x: 0, animated: true});
        }
      }
    },
    [onChange],
  );

  // Divide a given width into equal parts of items.length
  const itemWidth = useMemo(() => {
    const width = Dimensions.get('window').width;
    return width / items.length;
  }, [items.length]);

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <TabItem
            key={index}
            text={item}
            activeTab={activeTab}
            index={index}
            onPress={handleTabChange}
            itemWidth={itemWidth}
          />
        ))}
      </ScrollView>
    </View>
  );
};

type TabItemProps = {
  text: string;
  activeTab: number;
  index: number;
  onPress: (index: number) => void;
  itemWidth: number;
};

const TabItem = (props: TabItemProps) => {
  const {text, activeTab, index, onPress, itemWidth} = props;
  const isActive = activeTab === index;

  const minWidth = useMemo(() => Math.max(itemWidth, 80), [itemWidth]);
  return (
    <TouchableOpacity
      style={[styles.item, isActive ? styles.selectedItem : {}, {minWidth}]}
      onPress={() => onPress(index)}>
      <Text style={styles.itemText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
  container: {
    alignItems: 'center',
    height: 50,
  },
  item: {
    height: 50,
    minWidth: 80,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  selectedItem: {
    borderBottomWidth: 2,
  },
  itemText: {
    alignSelf: 'center',
    textAlign: 'center',
  },
});
