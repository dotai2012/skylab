import { Dimensions } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

type LookUp<T, K extends keyof T> = T[K];

type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
    ? U
    : T extends Promise<infer U>
      ? U
      : T;

interface Action<T, P> {
  readonly type: T;
  readonly payload: P;
}

type SagaAction<T, P = unknown> = {
  readonly type: T;
} & P;

export {
  Action,
  SagaAction,
  deviceWidth,
  deviceHeight,
  LookUp,
  Unpacked,
};

