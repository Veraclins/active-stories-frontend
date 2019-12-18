import { useState, useEffect } from 'react';
import api from 'services/api';
import { AxiosRequestConfig } from 'axios';
import { useDispatch } from 'react-redux';
import { changeLoadingState } from 'state/status';

export const useForm = (initialValues: any, callback: Function) => {
  const [values, setValues] = useState(initialValues);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
    callback(values);
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.persist();
    setValues((val: any) => {
      let value: any = '';
      if (event.target.type === 'checkbox') {
        event = event as React.ChangeEvent<HTMLInputElement>;
        value = event.target.checked;
      } else {
        value = event.target.value;
      }
      return {
        ...val,
        [event.target.name]: value,
      };
    });
  };

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

type Method = 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch';

interface Config extends AxiosRequestConfig {
  method?: Method;
}

export const useAxios = (
  { url, method = 'get', data }: Config,
  initializer: any
) => {
  const [result, setResult] = useState(initializer);
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      try {
        if (!url) return;

        dispatch(changeLoadingState(true));
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const response = await api[method](url, data);
        const payload = response.data;
        setResult(payload);
        dispatch(changeLoadingState(false));
      } catch (error) {
        dispatch(changeLoadingState(false));
      }
    };
    load();
  }, [url, method, data, dispatch]);
  return result;
};
