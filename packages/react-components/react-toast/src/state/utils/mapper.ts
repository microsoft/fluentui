import { Toast, ToastItem, ToastItemStatus } from '../types';

export function toToastItem(toast: Toast, status: ToastItemStatus): ToastItem {
  return {
    content: toast.content,
    containerId: toast.props.containerId,
    id: toast.props.toastId,
    type: toast.props.type,
    data: toast.props.data || {},
    isLoading: toast.props.isLoading,
    status,
  };
}
