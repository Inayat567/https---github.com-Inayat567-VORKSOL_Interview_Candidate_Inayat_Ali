import {Dispatch, SetStateAction} from 'react';
import {NavigationScreenProp} from 'react-navigation';

export interface NavigationProps {
  navigation: NavigationScreenProp<any, any>;
}

export type ButtonProp = {
  handlePress: any;
  title: string;
  iconed?: boolean;
  iconName?: string;
};

export type TextProp = {
  title: string;
};

export type InputProp = {
  value: string;
  placeholder: string;
  setValue: Dispatch<SetStateAction<any>>;
  name: string;
};
