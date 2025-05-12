import { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Props {
  children: React.ReactNode;
  onDelete: () => void;
  onEdit: () => void;
}

export default function SwipeableTile({ children, onDelete, onEdit }: Props) {
  const initialTranslateX = useSharedValue(0);
  const currentTranslateX = useSharedValue(0);
  const deleteCardTranslateX = useSharedValue(0);
  const itemHeight = useSharedValue(0);
  const itemWidth = useSharedValue(0);
  const itemOpacity = useSharedValue(1);
  const optionMenuWidth = useSharedValue(0);

  const OPTIONS_MENU_THRESHOLD = 0.4;
  const [isLayoutInitialized, setIsLayoutInitialized] = useState(false);

  const handleLayout = (e: LayoutChangeEvent) => {
    if (!isLayoutInitialized) {
      const { width, height } = e.nativeEvent.layout;
      itemHeight.value = height;
      itemWidth.value = width;
      optionMenuWidth.value = width * OPTIONS_MENU_THRESHOLD;
      setIsLayoutInitialized(true);
    }
  };

  const handleOnStart = () => {
    "worklet";
    initialTranslateX.value = currentTranslateX.value;
  };

  const resetPosition = () => {
    "worklet";
    currentTranslateX.value = withTiming(0, {
      easing: Easing.inOut(Easing.ease),
    });
  };

  const snapToDeleteButton = (deleteButtonThreshold: number) => {
    "worklet";
    currentTranslateX.value = withTiming(deleteButtonThreshold, {
      easing: Easing.inOut(Easing.ease),
    });
    initialTranslateX.value = deleteButtonThreshold;
  };

  const screenWidth = Dimensions.get("window").width;

  const deleteItem = () => {
    // Show confirmation popup before deleting
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          onPress: () => resetPosition(),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => performDelete(),
          style: "destructive",
        },
      ]
    );
  };

  const performDelete = () => {
    "worklet";
    currentTranslateX.value = withTiming(-screenWidth, {
      easing: Easing.inOut(Easing.ease),
    });
    deleteCardTranslateX.value = withTiming(
      -screenWidth,
      { easing: Easing.inOut(Easing.ease), duration: 600 },
      () => {
        itemHeight.value = withTiming(
          0,
          { easing: Easing.inOut(Easing.ease) },
          (finished) => {
            if (finished) {
              runOnJS(onDelete)();
            }
          }
        );
      }
    );
  };

  const handleOnUpdate = (
    event: GestureUpdateEvent<PanGestureHandlerEventPayload>
  ) => {
    "worklet";
    const isSwipingLeft = event.translationX + initialTranslateX.value <= 0;
    if (isSwipingLeft) {
      currentTranslateX.value = event.translationX + initialTranslateX.value;
    }
  };

  const handleOnEnd = (
    event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
  ) => {
    "worklet";
    const currentX = event.translationX + initialTranslateX.value;
    const deleteButtonPosition = -itemWidth.value * OPTIONS_MENU_THRESHOLD;
    const deleteThreshold = -itemWidth.value * 0.6; // Require more swipe to delete

    if (currentX > deleteButtonPosition / 2) {
      resetPosition();
    } else if (currentX > deleteThreshold) {
      snapToDeleteButton(deleteButtonPosition);
    } else {
      deleteItem();
    }
  };

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .activeOffsetY([-20, 20])
    .onStart(handleOnStart)
    .onUpdate(handleOnUpdate)
    .onEnd(handleOnEnd);

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: currentTranslateX.value }],
  }));

  const animatedDeleteButtonStyle = useAnimatedStyle(() => {
    // Calculate how far we've swiped as a percentage of the deleteButtonWidth
    const swipeRatio = Math.min(
      1,
      Math.abs(currentTranslateX.value) / optionMenuWidth.value
    );

    return {
      width: optionMenuWidth.value,
      opacity: swipeRatio,
      // Start right outside the container and move in as swipe progresses
      transform: [
        {
          translateX: (1 - swipeRatio) * optionMenuWidth.value,
        },
      ],
    };
  });

  const animatedContainerStyle = useAnimatedStyle(() => ({
    height: itemHeight.value,
    opacity: itemOpacity.value,
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          styles.container,
          isLayoutInitialized ? animatedContainerStyle : { height: "auto" },
        ]}
      >
        <Animated.View
          style={[styles.contentContainer, animatedCardStyle]}
          onLayout={handleLayout}
        >
          {children}
        </Animated.View>

        <Animated.View
          style={[styles.optionButtonsContainer, animatedDeleteButtonStyle]}
        >
          <View style={styles.optionButtons}>
            <TouchableOpacity style={styles.optionButton} onPress={onEdit}>
              <Image
                source={require("../Assets/icons/edit.png")}
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={deleteItem}>
              <Image
                source={require("../Assets/icons/trash.png")}
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
  },
  contentContainer: {
    zIndex: 1,
  },
  optionButtonsContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0,
  },
  optionButtons: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    height: "100%",
  },
  optionButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 54,
    width: 54,
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  deleteIcon: {
    width: 20,
    height: 20,
  },
});
