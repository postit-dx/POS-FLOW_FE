import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import {Outlet} from "react-router-dom";
import {ReactRouterAppProvider} from "@toolpad/core/react-router";
import NoCrashSharpIcon from '@mui/icons-material/NoCrashSharp';
import { grey } from '@mui/material/colors';

const NAVIGATION = [
    {
        segment: 'vehicle',
        title: '차량출입시스템',
        icon: <NoCrashSharpIcon color="primary" fontSize="medium" />
    }
];

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

export default function App(props) {
    const { window } = props;

    // Remove this const when copying and pasting into your project.
    const demoWindow = window !== undefined ? window() : undefined;

    return (
        <ReactRouterAppProvider
            branding={{
                title: "POS-FLOW",
                homeUrl: '/',
            }}
            theme={demoTheme}
            window={demoWindow}
            navigation={NAVIGATION}
        >
            <DashboardLayout defaultSidebarCollapsed>
                <div style={{ padding: '2rem' }}>
                    <Outlet />
                </div>
            </DashboardLayout>
        </ReactRouterAppProvider>
    );
}
