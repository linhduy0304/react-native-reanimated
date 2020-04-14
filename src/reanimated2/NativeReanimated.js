import {
  TurboModuleRegistry,
} from 'react-native';
import ReanimatedModule from '../ReanimatedModule';
import installFunctions from './InstallFunctions'

const InnerNativeModule = global.NativeReanimated || TurboModuleRegistry.get("NativeReanimated");

installFunctions(InnerNativeModule);

export default {

  // users will be able to install custom functions only in Reanimated namespace
  installFunction(label, fun) {
    const funStr = fun.toString()//(fun.asString === undefined) ? fun : fun.asString;
    InnerNativeModule.install(label, `(${funStr})`, 'Reanimated')
  },

  // users will be able to install custom constants only in Reanimated namespace
  installConst(label, val) {
    InnerNativeModule.install(label, val, 'Reanimated')
  },

  // shared value
  registerSharedValue(valueId, value) {
    InnerNativeModule.registerSharedValue(valueId, value);
  },

  unregisterSharedValue(valueId) {
    InnerNativeModule.unregisterSharedValue(valueId);
  },

  async getSharedValueAsync(valueId, callback) {
    return InnerNativeModule.getSharedValueAsync(valueId, callback);
  },

  setSharedValue(valueId, newValue) {
    InnerNativeModule.setSharedValue(valueId, newValue);
  },

  connectViewWithValue(viewTag, valueId, propName) {
    InnerNativeModule.connectViewWithValue(viewTag, valueId, propName);
  },

  disconnectViewFromValue(viewTag, valueId) {
    InnerNativeModule.disconnectViewFromValue(viewTag, valueId);
  },

  // worklet

  registerWorklet(workletId, holder) {
    InnerNativeModule.registerWorklet(workletId, holder.func.asString, holder.func.length);
  },

  setWorkletListener(workletId, callback) {
    InnerNativeModule.setWorkletListener(workletId, callback);
  },

  registerEventApplier(applierId, eventHash, workletID, sharedValues) {
    InnerNativeModule.registerEventApplier(applierId, eventHash, workletID, sharedValues);
  },

  unregisterEventApplier(applierId) {
    InnerNativeModule.unregisterEventApplier(applierId);
  },

  registerApplier(applierId, workletId, sharedValueIds /* shared values (worklet ID) */ ) {
    InnerNativeModule.registerApplierOnRender(applierId, workletId, sharedValueIds);
    ReanimatedModule.triggerRender();
  },

  unregisterApplier(applierId) {
    InnerNativeModule.unregisterApplierFromRender(applierId);
  },

  registerMapper(mapperId, workletId, sharedValueIds /* shared values (worklet ID) */ ) {
    InnerNativeModule.registerMapper(mapperId, workletId, sharedValueIds);
    ReanimatedModule.triggerRender();
  },

  unregisterMapper(mapperId) {
    InnerNativeModule.unregisterMapper(mapperId);
    ReanimatedModule.triggerRender();
  },

  unregisterWorklet(workletId) {
    InnerNativeModule.unregisterWorklet(workletId);
  },

  getRegistersState(option, callback) {
    InnerNativeModule.getRegistersState(option, callback);
  },

};