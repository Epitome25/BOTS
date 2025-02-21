import axios from 'axios';
import {log} from 'console';
import {NextFunction, Request, Response} from 'express';

const BASEURL = 'https://api.hcgateway.shuchir.dev/api/v2/login';

let loginToken: string = "";

export const getLoginToken = async (): Promise<string | null> => {
  try {
    const response = await axios.post(BASEURL, {
      username: 'junaid0047',
      password: '1234567890',
    });

    loginToken = response.data.token;
    console.log('Login Token:', loginToken);
    return loginToken;
  } catch (error: any) {
    console.error(
      'Error fetching login token:',
      error.response ? error.response.data : error.message,
    );
    return null;
  }
};

export const fetchData = async (
  healthMetric: string,
  loginToken: string,
): Promise<any> => {
  if (!loginToken) {
    console.error('No login token available');
    return;
  }

  try {
    const response = await axios.post(
      `https://api.hcgateway.shuchir.dev/api/v2/fetch${healthMetric}`,
      {queries: {}},
      {
        headers: {
          Authorization: `Bearer ${loginToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error:',
      error.response ? error.response.data : error.message,
    );
  }
};

export const getHealthMetric = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    // First, get the login token
    const healthMetric = req.path;
    log(healthMetric);
    const token = await getLoginToken();
    if (!token) {
      return res.status(401).json({error: 'Authentication failed'});
    }

    const data = await fetchData(healthMetric, token);

    if (data) {
      return res.json(data);
    } else {
      return res
        .status(500)
        .json({error: 'Failed to fetch health metric data'});
    }
  } catch (error) {
    next(error);
  }
};
