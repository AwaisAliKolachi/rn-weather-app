import { Input } from '@app/blueprints';
import { AppConfig } from '@src/constants';
import { useAppContext } from '@src/context';
import { useDebounce } from '@src/hooks';
import { Palette, scaled } from '@src/utils';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { SvgIcon } from '../AppIcon/AppIcon';
import { SVGIcons } from '@src/assets';

interface SearchResult {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

interface SearchInputProps {
  onSelect: (item: SearchResult) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSelect,
  placeholder = 'Search...',
  disabled,
}) => {
  const { services, appTheme, color } = useAppContext();
  const styles = SearchInputStyles(color);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [visible, setVisible] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const containerRef = useRef<View>(null);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      await services
        .searchCity({
          q: debouncedQuery,
          key: AppConfig.WEATHER_API_KEY,
        })
        .then(res => {
          setResults(res);
          setVisible(true);
        })
        .catch(err => {
          console.warn('Search failed:', err);
        });
    };

    fetchData();
  }, [debouncedQuery]);

  const handleSelect = (item: SearchResult) => {
    setQuery('');
    setVisible(false);
    Keyboard.dismiss();
    onSelect(item);
  };

  return (
    <View style={styles.container} ref={containerRef}>
      <Input
        placeholder={placeholder}
        variant="standard"
        value={query}
        editable={!disabled}
        onChangeText={text => {
          setQuery(text);
          setVisible(true);
        }}
        onFocus={() => setVisible(true)}
        inputContainerStyle={styles.input}
        borderRadius={50}
        backgroundColor={color.textFieldBg}
        leftIcon={
          <SvgIcon
            icon={
              appTheme === 'light'
                ? SVGIcons.SEARCH_LIGHT
                : SVGIcons.SEARCH_DARK
            }
            {...scaled(24)}
          />
        }
        rightIcon={
          query && (
            <TouchableOpacity
              onPress={() => setQuery('')}
              style={styles.crossIcon}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <SvgIcon
                icon={
                  appTheme === 'light'
                    ? SVGIcons.CROSS_LIGHT
                    : SVGIcons.CROSS_DARK
                }
                {...scaled(12)}
              />
            </TouchableOpacity>
          )
        }
      />

      {visible && results.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={results}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                  styles.item,
                  index === results.length - 1 && styles.itemNoBorder,
                ]}
                onPress={() => handleSelect(item)}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.details}>
                  {item.region ? `${item.region}, ` : ''}
                  {item.country}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const SearchInputStyles = ({
  secondaryColor,
  textColor,
  borderColor,
}: Palette) =>
  StyleSheet.create({
    input: {},
    container: { position: 'relative', margin: 8 },
    dropdown: {
      position: 'absolute',
      top: 55,
      width: '100%',
      backgroundColor: secondaryColor,
      borderWidth: 1,
      borderColor: borderColor,
      borderRadius: 16,
      zIndex: 999,
      maxHeight: 280,
    },
    item: {
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
    },
    itemNoBorder: {
      borderWidth: 0,
      borderBottomWidth: 0,
    },
    name: { fontSize: 16, color: textColor },
    details: { fontSize: 13, color: textColor },
    crossIcon: {
      marginRight: 10,
    },
  });
