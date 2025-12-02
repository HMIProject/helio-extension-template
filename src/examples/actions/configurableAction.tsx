import {
  createAction,
  createPropsSchema,
  dynamicProperties,
  props,
  useDynamicProperty,
  values,
} from '@hmiproject/helio-sdk';
import { Fragment } from 'react';
import { namespace } from '../../namespace';

export const configurableAction = createAction(namespace, {
  name: 'Configurable Action',
  description: 'Performs custom logic',
  icon: { name: 'Runner' },

  propsSchema: createPropsSchema().initial({
    value: props.DynamicProperty({
      label: 'Value',
      valueType: 'String',
      optional: false,
      defaultValue: dynamicProperties.StaticValue('Action called!'),
    }),

    isDisabled: props.DynamicProperty({
      label: 'Is disabled',
      valueType: 'Boolean',
      optional: true,
    }),
  }),

  useAction(props) {
    const value = useDynamicProperty(props.value, { valueType: values.String() });
    const isDisabled = useDynamicProperty(props.isDisabled, { valueType: values.Boolean() });

    return {
      canCall: props.isDisabled ? isDisabled.value : true,

      call() {
        alert(value.displayValue);
      },

      render() {
        return (
          <Fragment>
            {value.render()}
            {isDisabled.render()}
          </Fragment>
        );
      },
    };
  },
});
