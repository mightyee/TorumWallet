import styled from 'styled-components/native';

export interface PropsGlobalStyle {
    h1?: boolean,
    h2?: boolean,
    h3?: boolean,
    h4?: boolean,
    h5?: boolean,
    h6?: boolean,
    regular?: boolean,
    bold?: boolean,
    semi?: boolean,
    thin?: boolean,
    color?: string
}
const Text = styled.Text<PropsGlobalStyle>`
  /* default black */
  color: ${props => props.color || props.theme.colors.text};
  /* default 16px */
  font-size: ${props => props.theme.size.h6 || '16'}px;
  font-family: ZonaPro-Regular;
  /* default left */
  
  ${({ regular, bold, semi, thin }) => {
        switch (true) {
            case regular: {
                return { fontFamily: 'ZonaPro-Regular' };
            }
            case bold: {
                return { fontFamily: 'ZonaPro-Bold' };
            }
            case semi: {
                return { fontFamily: 'ZonaPro-SemiBold' };
            }
            case thin: {
                return { fontFamily: 'ZonaPro-Thin' };
            }
        }
    }}
  ${({ h1, h2, h3, h4, h5, h6 }) => {
        switch (true) {
            case h1: {
                return { fontFamily: 'ZonaPro-Bold', fontSize: '30px' };
            }
            case h2: {
                return { fontFamily: 'ZonaPro-Bold', fontSize: '24px' };
            }
            case h3: {
                return { fontFamily: 'ZonaPro-Bold', fontSize: '20px' };
            }
            case h4: {
                return { fontFamily: 'ZonaPro-Bold', fontSize: '16px' };
            }
            case h5: {
                return { fontFamily: 'ZonaPro-Bold', fontSize: '14px' };
            }
            case h6: {
                return { fontFamily: 'ZonaPro-Bold', fontSize: '13px' };
            }
        }
    }}
`;

export default Text;
