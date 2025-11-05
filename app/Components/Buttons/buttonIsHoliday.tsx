import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, LayoutChangeEvent, Pressable, StyleSheet, View } from "react-native";

type ToggleProps = {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  style?: object;
};

export default function ButtonIsHoliday({
  checked,
  onChange,
  disabled,
  style,
}: ToggleProps) {
  const anim = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    Animated.timing(anim, {
      toValue: checked ? 1 : 0,
      duration: 280,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [checked, anim]);

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setBox({ w: width, h: height });
  };

  // 하이라이트(흰색) 패널의 X 이동 (left=0 → left=50%)
  const sliderX = useMemo(
    () =>
      anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, Math.max(0, box.w / 2)], // 절반 이동
      }),
    [anim, box.w]
  );

  // 텍스트 색상 전환
  const dark = "#343434";
  const leftTextColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#fff", dark],
  });
  const rightTextColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [dark, "#fff"], 
    
  });

  return (
    <Pressable
      disabled={disabled}
      onPress={() => onChange(!checked)}
      style={[styles.touchWrap]}
    >
      <View style={[styles.container, style]} onLayout={onLayout}>
        {/* 배경(웹의 .toggleContainer) */}
        <View style={styles.bg} />

        {/* 하이라이트 패널(웹의 ::before) */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.slider,
            {
              width: box.w / 2 || 0,
              height: box.h || 0,
              transform: [{ translateX: sliderX }],
            },
          ]}
        />

        {/* 레이블 2칸 (grid 2열 느낌) */}
        <View style={styles.row}>
          <Animated.Text style={[styles.cellText, { color: leftTextColor }]}>
            {'weekday'}
          </Animated.Text>
          <Animated.Text style={[styles.cellText, { color: rightTextColor }]}>
            {'holiday'}
          </Animated.Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  touchWrap: {
    // body 중앙 정렬은 부모에서 해줘. 여기선 컴포넌트 자체만.
  },
  container: {
    position: "relative",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#fff",
    overflow: "hidden",
  },
  bg: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 50,
  },
  slider: {
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "#343434",
    borderRadius: 0,
  },
  row: {
    // grid(2열) 대신 flex 두 칸
    flexDirection: "row",
    alignItems: "center",
  },
  cellText: {
    height: 20,
    flex: 1,
    textAlign: "center",
    lineHeight: 20,
    fontSize: 10,
    fontWeight: "bold",
  },
});
