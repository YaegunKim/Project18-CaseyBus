// IconSymbol.tsx
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolView, type SymbolViewProps, type SymbolWeight } from 'expo-symbols';
import type { ComponentProps } from 'react';
import { Platform, type StyleProp } from 'react-native';

// MaterialIcons 이름 타입
type MIName = ComponentProps<typeof MaterialIcons>['name'];

/** 매핑: SF Symbols 이름 → MaterialIcons 이름 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code', // 적절한 대체 아이콘
  'chevron.right': 'chevron-right',                  // ← kebab-case로 수정!
  'map.fill': 'map',                                 // 새 아이콘 추가 예시
  'dot.square.fill': 'lens',
  'calendar': 'calendar-month',
  'clock.fill': 'access-time-filled',
  'gear': 'settings'
  // 원하는 만큼 추가
} satisfies Record<string, MIName>;

// name prop은 매핑에 있는 키거나(타입 세이프), 혹은 임의 문자열(유연성)
type IconSymbolName = keyof typeof MAPPING | (string & {});

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight,
}: {
  name: IconSymbolName;
  size?: number;
  color: SymbolViewProps['tintColor'];
  style?: StyleProp<any>;
  weight?: SymbolWeight;
}) {
  // iOS에선 진짜 SF Symbols 사용
  if (Platform.OS === 'ios') {
    return (
      <SymbolView
        name={name as SymbolViewProps['name']}
        tintColor={color}
        size={size}
        style={style as any}
        weight={weight}
      />
    );
  }

  // Android/Web에선 MaterialIcons 사용 (매핑 없으면 name을 그대로 시도하고, 다시 실패시 'help')
  const miName: MIName = ((MAPPING as unknown as Record<string, MIName>)[name as string] ?? (name as MIName)) || 'help';

  return <MaterialIcons color={color as any} size={size} name={miName} style={style as any} />;
}
