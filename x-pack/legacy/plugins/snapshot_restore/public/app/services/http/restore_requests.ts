/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { API_BASE_PATH } from '../../../../common/constants';
import { RestoreSettings } from '../../../../common/types';
import { UIM_RESTORE_CREATE } from '../../constants';
import { trackUiMetric } from '../ui_metric';
import { addBasePath } from './http';
import { sendRequest, useRequest } from './use_request';

export const executeRestore = async (
  repository: string,
  snapshot: string,
  restoreSettings: RestoreSettings
) => {
  const result = await sendRequest({
    path: addBasePath(
      `${API_BASE_PATH}restore/${encodeURIComponent(repository)}/${encodeURIComponent(snapshot)}`
    ),
    method: 'post',
    body: restoreSettings,
  });

  trackUiMetric(UIM_RESTORE_CREATE);
  return result;
};

export const useLoadRestores = (interval?: number) => {
  return useRequest({
    path: addBasePath(`${API_BASE_PATH}restores`),
    method: 'get',
    initialData: [],
    interval,
  });
};
