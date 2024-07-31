import type { Theme } from './types';

export const tokens: Record<keyof Theme, string> = {
  // Color tokens
  colorNeutralForeground1: 'var(--token1, var(--token2, var(--token3, var(--colorNeutralForeground1))))',
  colorNeutralForeground1Hover: 'var(--token4, var(--token5, var(--token6, var(--colorNeutralForeground1Hover))))',
  colorNeutralForeground1Pressed: 'var(--token7, var(--token8, var(--token9, var(--colorNeutralForeground1Pressed))))',
  colorNeutralForeground1Selected:
    'var(--token10, var(--token11, var(--token12, var(--colorNeutralForeground1Selected))))',
  colorNeutralForeground2: 'var(--token13, var(--token14, var(--token15, var(--colorNeutralForeground2))))',
  colorNeutralForeground2Hover: 'var(--token16, var(--token17, var(--token18, var(--colorNeutralForeground2Hover))))',
  colorNeutralForeground2Pressed:
    'var(--token19, var(--token20, var(--token21, var(--colorNeutralForeground2Pressed))))',
  colorNeutralForeground2Selected:
    'var(--token22, var(--token23, var(--token24, var(--colorNeutralForeground2Selected))))',
  colorNeutralForeground2BrandHover:
    'var(--token25, var(--token26, var(--token27, var(--colorNeutralForeground2BrandHover))))',
  colorNeutralForeground2BrandPressed:
    'var(--token28, var(--token29, var(--token30, var(--colorNeutralForeground2BrandPressed))))',
  colorNeutralForeground2BrandSelected:
    'var(--token31, var(--token32, var(--token33, var(--colorNeutralForeground2BrandSelected))))',
  colorNeutralForeground3: 'var(--token34, var(--token35, var(--token36, var(--colorNeutralForeground3))))',
  colorNeutralForeground3Hover: 'var(--token37, var(--token38, var(--token39, var(--colorNeutralForeground3Hover))))',
  colorNeutralForeground3Pressed:
    'var(--token40, var(--token41, var(--token42, var(--colorNeutralForeground3Pressed))))',
  colorNeutralForeground3Selected:
    'var(--token43, var(--token44, var(--token45, var(--colorNeutralForeground3Selected))))',
  colorNeutralForeground3BrandHover:
    'var(--token46, var(--token47, var(--token48, var(--colorNeutralForeground3BrandHover))))',
  colorNeutralForeground3BrandPressed:
    'var(--token49, var(--token50, var(--token51, var(--colorNeutralForeground3BrandPressed))))',
  colorNeutralForeground3BrandSelected:
    'var(--token52, var(--token53, var(--token54, var(--colorNeutralForeground3BrandSelected))))',
  colorNeutralForeground4: 'var(--token55, var(--token56, var(--token57, var(--colorNeutralForeground4))))',
  colorNeutralForegroundDisabled:
    'var(--token58, var(--token59, var(--token60, var(--colorNeutralForegroundDisabled))))',
  colorBrandForegroundLink: 'var(--token61, var(--token62, var(--token63, var(--colorBrandForegroundLink))))',
  colorBrandForegroundLinkHover: 'var(--token64, var(--token65, var(--token66, var(--colorBrandForegroundLinkHover))))',
  colorBrandForegroundLinkPressed:
    'var(--token67, var(--token68, var(--token69, var(--colorBrandForegroundLinkPressed))))',
  colorBrandForegroundLinkSelected:
    'var(--token70, var(--token71, var(--token72, var(--colorBrandForegroundLinkSelected))))',
  colorNeutralForeground2Link: 'var(--token73, var(--token74, var(--token75, var(--colorNeutralForeground2Link))))',
  colorNeutralForeground2LinkHover:
    'var(--token76, var(--token77, var(--token78, var(--colorNeutralForeground2LinkHover))))',
  colorNeutralForeground2LinkPressed:
    'var(--token79, var(--token80, var(--token81, var(--colorNeutralForeground2LinkPressed))))',
  colorNeutralForeground2LinkSelected:
    'var(--token82, var(--token83, var(--token84, var(--colorNeutralForeground2LinkSelected))))',
  colorCompoundBrandForeground1: 'var(--token85, var(--token86, var(--token87, var(--colorCompoundBrandForeground1))))',
  colorCompoundBrandForeground1Hover:
    'var(--token88, var(--token89, var(--token90, var(--colorCompoundBrandForeground1Hover))))',
  colorCompoundBrandForeground1Pressed:
    'var(--token91, var(--token92, var(--token93, var(--colorCompoundBrandForeground1Pressed))))',
  colorNeutralForegroundOnBrand: 'var(--token94, var(--token95, var(--token96, var(--colorNeutralForegroundOnBrand))))',
  colorNeutralForegroundInverted:
    'var(--token97, var(--token98, var(--token99, var(--colorNeutralForegroundInverted))))',
  colorNeutralForegroundInvertedHover:
    'var(--token100, var(--token101, var(--token102, var(--colorNeutralForegroundInvertedHover))))',
  colorNeutralForegroundInvertedPressed:
    'var(--token103, var(--token104, var(--token105, var(--colorNeutralForegroundInvertedPressed))))',
  colorNeutralForegroundInvertedSelected:
    'var(--token106, var(--token107, var(--token108, var(--colorNeutralForegroundInvertedSelected))))',
  colorNeutralForegroundInverted2:
    'var(--token109, var(--token110, var(--token111, var(--colorNeutralForegroundInverted2))))',
  colorNeutralForegroundStaticInverted:
    'var(--token112, var(--token113, var(--token114, var(--colorNeutralForegroundStaticInverted))))',
  colorNeutralForegroundInvertedLink:
    'var(--token115, var(--token116, var(--token117, var(--colorNeutralForegroundInvertedLink))))',
  colorNeutralForegroundInvertedLinkHover:
    'var(--token118, var(--token119, var(--token120, var(--colorNeutralForegroundInvertedLinkHover))))',
  colorNeutralForegroundInvertedLinkPressed:
    'var(--token121, var(--token122, var(--token123, var(--colorNeutralForegroundInvertedLinkPressed))))',
  colorNeutralForegroundInvertedLinkSelected:
    'var(--token124, var(--token125, var(--token126, var(--colorNeutralForegroundInvertedLinkSelected))))',
  colorNeutralForegroundInvertedDisabled:
    'var(--token127, var(--token128, var(--token129, var(--colorNeutralForegroundInvertedDisabled))))',
  colorBrandForeground1: 'var(--token130, var(--token131, var(--token132, var(--colorBrandForeground1))))',
  colorBrandForeground2: 'var(--token133, var(--token134, var(--token135, var(--colorBrandForeground2))))',
  colorBrandForeground2Hover: 'var(--token136, var(--token137, var(--token138, var(--colorBrandForeground2Hover))))',
  colorBrandForeground2Pressed:
    'var(--token139, var(--token140, var(--token141, var(--colorBrandForeground2Pressed))))',
  colorNeutralForeground1Static:
    'var(--token142, var(--token143, var(--token144, var(--colorNeutralForeground1Static))))',
  colorBrandForegroundInverted:
    'var(--token145, var(--token146, var(--token147, var(--colorBrandForegroundInverted))))',
  colorBrandForegroundInvertedHover:
    'var(--token148, var(--token149, var(--token150, var(--colorBrandForegroundInvertedHover))))',
  colorBrandForegroundInvertedPressed:
    'var(--token151, var(--token152, var(--token153, var(--colorBrandForegroundInvertedPressed))))',
  colorBrandForegroundOnLight: 'var(--token154, var(--token155, var(--token156, var(--colorBrandForegroundOnLight))))',
  colorBrandForegroundOnLightHover:
    'var(--token157, var(--token158, var(--token159, var(--colorBrandForegroundOnLightHover))))',
  colorBrandForegroundOnLightPressed:
    'var(--token160, var(--token161, var(--token162, var(--colorBrandForegroundOnLightPressed))))',
  colorBrandForegroundOnLightSelected:
    'var(--token163, var(--token164, var(--token165, var(--colorBrandForegroundOnLightSelected))))',
  colorNeutralBackground1: 'var(--token166, var(--token167, var(--token168, var(--colorNeutralBackground1))))',
  colorNeutralBackground1Hover:
    'var(--token169, var(--token170, var(--token171, var(--colorNeutralBackground1Hover))))',
  colorNeutralBackground1Pressed:
    'var(--token172, var(--token173, var(--token174, var(--colorNeutralBackground1Pressed))))',
  colorNeutralBackground1Selected:
    'var(--token175, var(--token176, var(--token177, var(--colorNeutralBackground1Selected))))',
  colorNeutralBackground2: 'var(--token178, var(--token179, var(--token180, var(--colorNeutralBackground2))))',
  colorNeutralBackground2Hover:
    'var(--token181, var(--token182, var(--token183, var(--colorNeutralBackground2Hover))))',
  colorNeutralBackground2Pressed:
    'var(--token184, var(--token185, var(--token186, var(--colorNeutralBackground2Pressed))))',
  colorNeutralBackground2Selected:
    'var(--token187, var(--token188, var(--token189, var(--colorNeutralBackground2Selected))))',
  colorNeutralBackground3: 'var(--token190, var(--token191, var(--token192, var(--colorNeutralBackground3))))',
  colorNeutralBackground3Hover:
    'var(--token193, var(--token194, var(--token195, var(--colorNeutralBackground3Hover))))',
  colorNeutralBackground3Pressed:
    'var(--token196, var(--token197, var(--token198, var(--colorNeutralBackground3Pressed))))',
  colorNeutralBackground3Selected:
    'var(--token199, var(--token200, var(--token201, var(--colorNeutralBackground3Selected))))',
  colorNeutralBackground4: 'var(--token202, var(--token203, var(--token204, var(--colorNeutralBackground4))))',
  colorNeutralBackground4Hover:
    'var(--token205, var(--token206, var(--token207, var(--colorNeutralBackground4Hover))))',
  colorNeutralBackground4Pressed:
    'var(--token208, var(--token209, var(--token210, var(--colorNeutralBackground4Pressed))))',
  colorNeutralBackground4Selected:
    'var(--token211, var(--token212, var(--token213, var(--colorNeutralBackground4Selected))))',
  colorNeutralBackground5: 'var(--token214, var(--token215, var(--token216, var(--colorNeutralBackground5))))',
  colorNeutralBackground5Hover:
    'var(--token217, var(--token218, var(--token219, var(--colorNeutralBackground5Hover))))',
  colorNeutralBackground5Pressed:
    'var(--token220, var(--token221, var(--token222, var(--colorNeutralBackground5Pressed))))',
  colorNeutralBackground5Selected:
    'var(--token223, var(--token224, var(--token225, var(--colorNeutralBackground5Selected))))',
  colorNeutralBackground6: 'var(--token226, var(--token227, var(--token228, var(--colorNeutralBackground6))))',
  colorNeutralBackgroundInverted:
    'var(--token229, var(--token230, var(--token231, var(--colorNeutralBackgroundInverted))))',
  colorNeutralBackgroundStatic:
    'var(--token232, var(--token233, var(--token234, var(--colorNeutralBackgroundStatic))))',
  colorNeutralBackgroundAlpha: 'var(--token235, var(--token236, var(--token237, var(--colorNeutralBackgroundAlpha))))',
  colorNeutralBackgroundAlpha2:
    'var(--token238, var(--token239, var(--token240, var(--colorNeutralBackgroundAlpha2))))',
  colorSubtleBackground: 'var(--token241, var(--token242, var(--token243, var(--colorSubtleBackground))))',
  colorSubtleBackgroundHover: 'var(--token244, var(--token245, var(--token246, var(--colorSubtleBackgroundHover))))',
  colorSubtleBackgroundPressed:
    'var(--token247, var(--token248, var(--token249, var(--colorSubtleBackgroundPressed))))',
  colorSubtleBackgroundSelected:
    'var(--token250, var(--token251, var(--token252, var(--colorSubtleBackgroundSelected))))',
  colorSubtleBackgroundLightAlphaHover:
    'var(--token253, var(--token254, var(--token255, var(--colorSubtleBackgroundLightAlphaHover))))',
  colorSubtleBackgroundLightAlphaPressed:
    'var(--token256, var(--token257, var(--token258, var(--colorSubtleBackgroundLightAlphaPressed))))',
  colorSubtleBackgroundLightAlphaSelected:
    'var(--token259, var(--token260, var(--token261, var(--colorSubtleBackgroundLightAlphaSelected))))',
  colorSubtleBackgroundInverted:
    'var(--token262, var(--token263, var(--token264, var(--colorSubtleBackgroundInverted))))',
  colorSubtleBackgroundInvertedHover:
    'var(--token265, var(--token266, var(--token267, var(--colorSubtleBackgroundInvertedHover))))',
  colorSubtleBackgroundInvertedPressed:
    'var(--token268, var(--token269, var(--token270, var(--colorSubtleBackgroundInvertedPressed))))',
  colorSubtleBackgroundInvertedSelected:
    'var(--token271, var(--token272, var(--token273, var(--colorSubtleBackgroundInvertedSelected))))',
  colorTransparentBackground: 'var(--token274, var(--token275, var(--token276, var(--colorTransparentBackground))))',
  colorTransparentBackgroundHover:
    'var(--token277, var(--token278, var(--token279, var(--colorTransparentBackgroundHover))))',
  colorTransparentBackgroundPressed:
    'var(--token280, var(--token281, var(--token282, var(--colorTransparentBackgroundPressed))))',
  colorTransparentBackgroundSelected:
    'var(--token283, var(--token284, var(--token285, var(--colorTransparentBackgroundSelected))))',
  colorNeutralBackgroundDisabled:
    'var(--token286, var(--token287, var(--token288, var(--colorNeutralBackgroundDisabled))))',
  colorNeutralBackgroundInvertedDisabled:
    'var(--token289, var(--token290, var(--token291, var(--colorNeutralBackgroundInvertedDisabled))))',
  colorNeutralStencil1: 'var(--token292, var(--token293, var(--token294, var(--colorNeutralStencil1))))',
  colorNeutralStencil2: 'var(--token295, var(--token296, var(--token297, var(--colorNeutralStencil2))))',
  colorNeutralStencil1Alpha: 'var(--token298, var(--token299, var(--token300, var(--colorNeutralStencil1Alpha))))',
  colorNeutralStencil2Alpha: 'var(--token301, var(--token302, var(--token303, var(--colorNeutralStencil2Alpha))))',
  colorBackgroundOverlay: 'var(--token304, var(--token305, var(--token306, var(--colorBackgroundOverlay))))',
  colorScrollbarOverlay: 'var(--token307, var(--token308, var(--token309, var(--colorScrollbarOverlay))))',
  colorBrandBackground: 'var(--token310, var(--token311, var(--token312, var(--colorBrandBackground))))',
  colorBrandBackgroundHover: 'var(--token313, var(--token314, var(--token315, var(--colorBrandBackgroundHover))))',
  colorBrandBackgroundPressed: 'var(--token316, var(--token317, var(--token318, var(--colorBrandBackgroundPressed))))',
  colorBrandBackgroundSelected:
    'var(--token319, var(--token320, var(--token321, var(--colorBrandBackgroundSelected))))',
  colorCompoundBrandBackground:
    'var(--token322, var(--token323, var(--token324, var(--colorCompoundBrandBackground))))',
  colorCompoundBrandBackgroundHover:
    'var(--token325, var(--token326, var(--token327, var(--colorCompoundBrandBackgroundHover))))',
  colorCompoundBrandBackgroundPressed:
    'var(--token328, var(--token329, var(--token330, var(--colorCompoundBrandBackgroundPressed))))',
  colorBrandBackgroundStatic: 'var(--token331, var(--token332, var(--token333, var(--colorBrandBackgroundStatic))))',
  colorBrandBackground2: 'var(--token334, var(--token335, var(--token336, var(--colorBrandBackground2))))',
  colorBrandBackground2Hover: 'var(--token337, var(--token338, var(--token339, var(--colorBrandBackground2Hover))))',
  colorBrandBackground2Pressed:
    'var(--token340, var(--token341, var(--token342, var(--colorBrandBackground2Pressed))))',
  colorBrandBackground3Static: 'var(--token343, var(--token344, var(--token345, var(--colorBrandBackground3Static))))',
  colorBrandBackground4Static: 'var(--token346, var(--token347, var(--token348, var(--colorBrandBackground4Static))))',
  colorBrandBackgroundInverted:
    'var(--token349, var(--token350, var(--token351, var(--colorBrandBackgroundInverted))))',
  colorBrandBackgroundInvertedHover:
    'var(--token352, var(--token353, var(--token354, var(--colorBrandBackgroundInvertedHover))))',
  colorBrandBackgroundInvertedPressed:
    'var(--token355, var(--token356, var(--token357, var(--colorBrandBackgroundInvertedPressed))))',
  colorBrandBackgroundInvertedSelected:
    'var(--token358, var(--token359, var(--token360, var(--colorBrandBackgroundInvertedSelected))))',
  colorNeutralCardBackground: 'var(--token361, var(--token362, var(--token363, var(--colorNeutralCardBackground))))',
  colorNeutralCardBackgroundHover:
    'var(--token364, var(--token365, var(--token366, var(--colorNeutralCardBackgroundHover))))',
  colorNeutralCardBackgroundPressed:
    'var(--token367, var(--token368, var(--token369, var(--colorNeutralCardBackgroundPressed))))',
  colorNeutralCardBackgroundSelected:
    'var(--token370, var(--token371, var(--token372, var(--colorNeutralCardBackgroundSelected))))',
  colorNeutralCardBackgroundDisabled:
    'var(--token373, var(--token374, var(--token375, var(--colorNeutralCardBackgroundDisabled))))',
  colorNeutralStrokeAccessible:
    'var(--token376, var(--token377, var(--token378, var(--colorNeutralStrokeAccessible))))',
  colorNeutralStrokeAccessibleHover:
    'var(--token379, var(--token380, var(--token381, var(--colorNeutralStrokeAccessibleHover))))',
  colorNeutralStrokeAccessiblePressed:
    'var(--token382, var(--token383, var(--token384, var(--colorNeutralStrokeAccessiblePressed))))',
  colorNeutralStrokeAccessibleSelected:
    'var(--token385, var(--token386, var(--token387, var(--colorNeutralStrokeAccessibleSelected))))',
  colorNeutralStroke1: 'var(--token388, var(--token389, var(--token390, var(--colorNeutralStroke1))))',
  colorNeutralStroke1Hover: 'var(--token391, var(--token392, var(--token393, var(--colorNeutralStroke1Hover))))',
  colorNeutralStroke1Pressed: 'var(--token394, var(--token395, var(--token396, var(--colorNeutralStroke1Pressed))))',
  colorNeutralStroke1Selected: 'var(--token397, var(--token398, var(--token399, var(--colorNeutralStroke1Selected))))',
  colorNeutralStroke2: 'var(--token400, var(--token401, var(--token402, var(--colorNeutralStroke2))))',
  colorNeutralStroke3: 'var(--token403, var(--token404, var(--token405, var(--colorNeutralStroke3))))',
  colorNeutralStrokeSubtle: 'var(--token406, var(--token407, var(--token408, var(--colorNeutralStrokeSubtle))))',
  colorNeutralStrokeOnBrand: 'var(--token409, var(--token410, var(--token411, var(--colorNeutralStrokeOnBrand))))',
  colorNeutralStrokeOnBrand2: 'var(--token412, var(--token413, var(--token414, var(--colorNeutralStrokeOnBrand2))))',
  colorNeutralStrokeOnBrand2Hover:
    'var(--token415, var(--token416, var(--token417, var(--colorNeutralStrokeOnBrand2Hover))))',
  colorNeutralStrokeOnBrand2Pressed:
    'var(--token418, var(--token419, var(--token420, var(--colorNeutralStrokeOnBrand2Pressed))))',
  colorNeutralStrokeOnBrand2Selected:
    'var(--token421, var(--token422, var(--token423, var(--colorNeutralStrokeOnBrand2Selected))))',
  colorBrandStroke1: 'var(--token424, var(--token425, var(--token426, var(--colorBrandStroke1))))',
  colorBrandStroke2: 'var(--token427, var(--token428, var(--token429, var(--colorBrandStroke2))))',
  colorBrandStroke2Hover: 'var(--token430, var(--token431, var(--token432, var(--colorBrandStroke2Hover))))',
  colorBrandStroke2Pressed: 'var(--token433, var(--token434, var(--token435, var(--colorBrandStroke2Pressed))))',
  colorBrandStroke2Contrast: 'var(--token436, var(--token437, var(--token438, var(--colorBrandStroke2Contrast))))',
  colorCompoundBrandStroke: 'var(--token439, var(--token440, var(--token441, var(--colorCompoundBrandStroke))))',
  colorCompoundBrandStrokeHover:
    'var(--token442, var(--token443, var(--token444, var(--colorCompoundBrandStrokeHover))))',
  colorCompoundBrandStrokePressed:
    'var(--token445, var(--token446, var(--token447, var(--colorCompoundBrandStrokePressed))))',
  colorNeutralStrokeDisabled: 'var(--token448, var(--token449, var(--token450, var(--colorNeutralStrokeDisabled))))',
  colorNeutralStrokeInvertedDisabled:
    'var(--token451, var(--token452, var(--token453, var(--colorNeutralStrokeInvertedDisabled))))',
  colorTransparentStroke: 'var(--token454, var(--token455, var(--token456, var(--colorTransparentStroke))))',
  colorTransparentStrokeInteractive:
    'var(--token457, var(--token458, var(--token459, var(--colorTransparentStrokeInteractive))))',
  colorTransparentStrokeDisabled:
    'var(--token460, var(--token461, var(--token462, var(--colorTransparentStrokeDisabled))))',
  colorNeutralStrokeAlpha: 'var(--token463, var(--token464, var(--token465, var(--colorNeutralStrokeAlpha))))',
  colorNeutralStrokeAlpha2: 'var(--token466, var(--token467, var(--token468, var(--colorNeutralStrokeAlpha2))))',
  colorStrokeFocus1: 'var(--token469, var(--token470, var(--token471, var(--colorStrokeFocus1))))',
  colorStrokeFocus2: 'var(--token472, var(--token473, var(--token474, var(--colorStrokeFocus2))))',
  colorNeutralShadowAmbient: 'var(--token475, var(--token476, var(--token477, var(--colorNeutralShadowAmbient))))',
  colorNeutralShadowKey: 'var(--token478, var(--token479, var(--token480, var(--colorNeutralShadowKey))))',
  colorNeutralShadowAmbientLighter:
    'var(--token481, var(--token482, var(--token483, var(--colorNeutralShadowAmbientLighter))))',
  colorNeutralShadowKeyLighter:
    'var(--token484, var(--token485, var(--token486, var(--colorNeutralShadowKeyLighter))))',
  colorNeutralShadowAmbientDarker:
    'var(--token487, var(--token488, var(--token489, var(--colorNeutralShadowAmbientDarker))))',
  colorNeutralShadowKeyDarker: 'var(--token490, var(--token491, var(--token492, var(--colorNeutralShadowKeyDarker))))',
  colorBrandShadowAmbient: 'var(--token493, var(--token494, var(--token495, var(--colorBrandShadowAmbient))))',
  colorBrandShadowKey: 'var(--token496, var(--token497, var(--token498, var(--colorBrandShadowKey))))',

  // Color palette tokens

  // Color palette red tokens
  colorPaletteRedBackground1: 'var(--token499, var(--token500, var(--token501, var(--colorPaletteRedBackground1))))',
  colorPaletteRedBackground2: 'var(--token502, var(--token503, var(--token504, var(--colorPaletteRedBackground2))))',
  colorPaletteRedBackground3: 'var(--token505, var(--token506, var(--token507, var(--colorPaletteRedBackground3))))',
  colorPaletteRedBorderActive: 'var(--token508, var(--token509, var(--token510, var(--colorPaletteRedBorderActive))))',
  colorPaletteRedBorder1: 'var(--token511, var(--token512, var(--token513, var(--colorPaletteRedBorder1))))',
  colorPaletteRedBorder2: 'var(--token514, var(--token515, var(--token516, var(--colorPaletteRedBorder2))))',
  colorPaletteRedForeground1: 'var(--token517, var(--token518, var(--token519, var(--colorPaletteRedForeground1))))',
  colorPaletteRedForeground2: 'var(--token520, var(--token521, var(--token522, var(--colorPaletteRedForeground2))))',
  colorPaletteRedForeground3: 'var(--token523, var(--token524, var(--token525, var(--colorPaletteRedForeground3))))',
  colorPaletteRedForegroundInverted:
    'var(--token526, var(--token527, var(--token528, var(--colorPaletteRedForegroundInverted))))',

  // Color palette green tokens
  colorPaletteGreenBackground1:
    'var(--token529, var(--token530, var(--token531, var(--colorPaletteGreenBackground1))))',
  colorPaletteGreenBackground2:
    'var(--token532, var(--token533, var(--token534, var(--colorPaletteGreenBackground2))))',
  colorPaletteGreenBackground3:
    'var(--token535, var(--token536, var(--token537, var(--colorPaletteGreenBackground3))))',
  colorPaletteGreenBorderActive:
    'var(--token538, var(--token539, var(--token540, var(--colorPaletteGreenBorderActive))))',
  colorPaletteGreenBorder1: 'var(--token541, var(--token542, var(--token543, var(--colorPaletteGreenBorder1))))',
  colorPaletteGreenBorder2: 'var(--token544, var(--token545, var(--token546, var(--colorPaletteGreenBorder2))))',
  colorPaletteGreenForeground1:
    'var(--token547, var(--token548, var(--token549, var(--colorPaletteGreenForeground1))))',
  colorPaletteGreenForeground2:
    'var(--token550, var(--token551, var(--token552, var(--colorPaletteGreenForeground2))))',
  colorPaletteGreenForeground3:
    'var(--token553, var(--token554, var(--token555, var(--colorPaletteGreenForeground3))))',
  colorPaletteGreenForegroundInverted:
    'var(--token556, var(--token557, var(--token558, var(--colorPaletteGreenForegroundInverted))))',

  // Color palette dark orange tokens
  colorPaletteDarkOrangeBackground1:
    'var(--token559, var(--token560, var(--token561, var(--colorPaletteDarkOrangeBackground1))))',
  colorPaletteDarkOrangeBackground2:
    'var(--token562, var(--token563, var(--token564, var(--colorPaletteDarkOrangeBackground2))))',
  colorPaletteDarkOrangeBackground3:
    'var(--token565, var(--token566, var(--token567, var(--colorPaletteDarkOrangeBackground3))))',
  colorPaletteDarkOrangeBorderActive:
    'var(--token568, var(--token569, var(--token570, var(--colorPaletteDarkOrangeBorderActive))))',
  colorPaletteDarkOrangeBorder1:
    'var(--token571, var(--token572, var(--token573, var(--colorPaletteDarkOrangeBorder1))))',
  colorPaletteDarkOrangeBorder2:
    'var(--token574, var(--token575, var(--token576, var(--colorPaletteDarkOrangeBorder2))))',
  colorPaletteDarkOrangeForeground1:
    'var(--token577, var(--token578, var(--token579, var(--colorPaletteDarkOrangeForeground1))))',
  colorPaletteDarkOrangeForeground2:
    'var(--token580, var(--token581, var(--token582, var(--colorPaletteDarkOrangeForeground2))))',
  colorPaletteDarkOrangeForeground3:
    'var(--token583, var(--token584, var(--token585, var(--colorPaletteDarkOrangeForeground3))))',

  // Color palette yellow tokens
  colorPaletteYellowBackground1:
    'var(--token586, var(--token587, var(--token588, var(--colorPaletteYellowBackground1))))',
  colorPaletteYellowBackground2:
    'var(--token589, var(--token590, var(--token591, var(--colorPaletteYellowBackground2))))',
  colorPaletteYellowBackground3:
    'var(--token592, var(--token593, var(--token594, var(--colorPaletteYellowBackground3))))',
  colorPaletteYellowBorderActive:
    'var(--token595, var(--token596, var(--token597, var(--colorPaletteYellowBorderActive))))',
  colorPaletteYellowBorder1: 'var(--token598, var(--token599, var(--token600, var(--colorPaletteYellowBorder1))))',
  colorPaletteYellowBorder2: 'var(--token601, var(--token602, var(--token603, var(--colorPaletteYellowBorder2))))',
  colorPaletteYellowForeground1:
    'var(--token604, var(--token605, var(--token606, var(--colorPaletteYellowForeground1))))',
  colorPaletteYellowForeground2:
    'var(--token607, var(--token608, var(--token609, var(--colorPaletteYellowForeground2))))',
  colorPaletteYellowForeground3:
    'var(--token610, var(--token611, var(--token612, var(--colorPaletteYellowForeground3))))',
  colorPaletteYellowForegroundInverted:
    'var(--token613, var(--token614, var(--token615, var(--colorPaletteYellowForegroundInverted))))',

  // Color palette berry tokens
  colorPaletteBerryBackground1:
    'var(--token616, var(--token617, var(--token618, var(--colorPaletteBerryBackground1))))',
  colorPaletteBerryBackground2:
    'var(--token619, var(--token620, var(--token621, var(--colorPaletteBerryBackground2))))',
  colorPaletteBerryBackground3:
    'var(--token622, var(--token623, var(--token624, var(--colorPaletteBerryBackground3))))',
  colorPaletteBerryBorderActive:
    'var(--token625, var(--token626, var(--token627, var(--colorPaletteBerryBorderActive))))',
  colorPaletteBerryBorder1: 'var(--token628, var(--token629, var(--token630, var(--colorPaletteBerryBorder1))))',
  colorPaletteBerryBorder2: 'var(--token631, var(--token632, var(--token633, var(--colorPaletteBerryBorder2))))',
  colorPaletteBerryForeground1:
    'var(--token634, var(--token635, var(--token636, var(--colorPaletteBerryForeground1))))',
  colorPaletteBerryForeground2:
    'var(--token637, var(--token638, var(--token639, var(--colorPaletteBerryForeground2))))',
  colorPaletteBerryForeground3:
    'var(--token640, var(--token641, var(--token642, var(--colorPaletteBerryForeground3))))',

  // Color palette marigold tokens
  colorPaletteMarigoldBackground1:
    'var(--token643, var(--token644, var(--token645, var(--colorPaletteMarigoldBackground1))))',
  colorPaletteMarigoldBackground2:
    'var(--token646, var(--token647, var(--token648, var(--colorPaletteMarigoldBackground2))))',
  colorPaletteMarigoldBackground3:
    'var(--token649, var(--token650, var(--token651, var(--colorPaletteMarigoldBackground3))))',
  colorPaletteMarigoldBorderActive:
    'var(--token652, var(--token653, var(--token654, var(--colorPaletteMarigoldBorderActive))))',
  colorPaletteMarigoldBorder1: 'var(--token655, var(--token656, var(--token657, var(--colorPaletteMarigoldBorder1))))',
  colorPaletteMarigoldBorder2: 'var(--token658, var(--token659, var(--token660, var(--colorPaletteMarigoldBorder2))))',
  colorPaletteMarigoldForeground1:
    'var(--token661, var(--token662, var(--token663, var(--colorPaletteMarigoldForeground1))))',
  colorPaletteMarigoldForeground2:
    'var(--token664, var(--token665, var(--token666, var(--colorPaletteMarigoldForeground2))))',
  colorPaletteMarigoldForeground3:
    'var(--token667, var(--token668, var(--token669, var(--colorPaletteMarigoldForeground3))))',

  // Color palette light green tokens
  colorPaletteLightGreenBackground1:
    'var(--token670, var(--token671, var(--token672, var(--colorPaletteLightGreenBackground1))))',
  colorPaletteLightGreenBackground2:
    'var(--token673, var(--token674, var(--token675, var(--colorPaletteLightGreenBackground2))))',
  colorPaletteLightGreenBackground3:
    'var(--token676, var(--token677, var(--token678, var(--colorPaletteLightGreenBackground3))))',
  colorPaletteLightGreenBorderActive:
    'var(--token679, var(--token680, var(--token681, var(--colorPaletteLightGreenBorderActive))))',
  colorPaletteLightGreenBorder1:
    'var(--token682, var(--token683, var(--token684, var(--colorPaletteLightGreenBorder1))))',
  colorPaletteLightGreenBorder2:
    'var(--token685, var(--token686, var(--token687, var(--colorPaletteLightGreenBorder2))))',
  colorPaletteLightGreenForeground1:
    'var(--token688, var(--token689, var(--token690, var(--colorPaletteLightGreenForeground1))))',
  colorPaletteLightGreenForeground2:
    'var(--token691, var(--token692, var(--token693, var(--colorPaletteLightGreenForeground2))))',
  colorPaletteLightGreenForeground3:
    'var(--token694, var(--token695, var(--token696, var(--colorPaletteLightGreenForeground3))))',

  // Color palette anchor tokens
  colorPaletteAnchorBackground2:
    'var(--token697, var(--token698, var(--token699, var(--colorPaletteAnchorBackground2))))',
  colorPaletteAnchorBorderActive:
    'var(--token700, var(--token701, var(--token702, var(--colorPaletteAnchorBorderActive))))',
  colorPaletteAnchorForeground2:
    'var(--token703, var(--token704, var(--token705, var(--colorPaletteAnchorForeground2))))',

  // Color palette beige tokens
  colorPaletteBeigeBackground2:
    'var(--token706, var(--token707, var(--token708, var(--colorPaletteBeigeBackground2))))',
  colorPaletteBeigeBorderActive:
    'var(--token709, var(--token710, var(--token711, var(--colorPaletteBeigeBorderActive))))',
  colorPaletteBeigeForeground2:
    'var(--token712, var(--token713, var(--token714, var(--colorPaletteBeigeForeground2))))',

  // Color palette blue tokens
  colorPaletteBlueBackground2: 'var(--token715, var(--token716, var(--token717, var(--colorPaletteBlueBackground2))))',
  colorPaletteBlueBorderActive:
    'var(--token718, var(--token719, var(--token720, var(--colorPaletteBlueBorderActive))))',
  colorPaletteBlueForeground2: 'var(--token721, var(--token722, var(--token723, var(--colorPaletteBlueForeground2))))',

  // Color palette brass tokens
  colorPaletteBrassBackground2:
    'var(--token724, var(--token725, var(--token726, var(--colorPaletteBrassBackground2))))',
  colorPaletteBrassBorderActive:
    'var(--token727, var(--token728, var(--token729, var(--colorPaletteBrassBorderActive))))',
  colorPaletteBrassForeground2:
    'var(--token730, var(--token731, var(--token732, var(--colorPaletteBrassForeground2))))',

  // Color palette brown tokens
  colorPaletteBrownBackground2:
    'var(--token733, var(--token734, var(--token735, var(--colorPaletteBrownBackground2))))',
  colorPaletteBrownBorderActive:
    'var(--token736, var(--token737, var(--token738, var(--colorPaletteBrownBorderActive))))',
  colorPaletteBrownForeground2:
    'var(--token739, var(--token740, var(--token741, var(--colorPaletteBrownForeground2))))',

  // Color palette cornflower tokens
  colorPaletteCornflowerBackground2:
    'var(--token742, var(--token743, var(--token744, var(--colorPaletteCornflowerBackground2))))',
  colorPaletteCornflowerBorderActive:
    'var(--token745, var(--token746, var(--token747, var(--colorPaletteCornflowerBorderActive))))',
  colorPaletteCornflowerForeground2:
    'var(--token748, var(--token749, var(--token750, var(--colorPaletteCornflowerForeground2))))',

  // Color palette cranberry tokens
  colorPaletteCranberryBackground2:
    'var(--token751, var(--token752, var(--token753, var(--colorPaletteCranberryBackground2))))',
  colorPaletteCranberryBorderActive:
    'var(--token754, var(--token755, var(--token756, var(--colorPaletteCranberryBorderActive))))',
  colorPaletteCranberryForeground2:
    'var(--token757, var(--token758, var(--token759, var(--colorPaletteCranberryForeground2))))',

  // Color palette dark green tokens
  colorPaletteDarkGreenBackground2:
    'var(--token760, var(--token761, var(--token762, var(--colorPaletteDarkGreenBackground2))))',
  colorPaletteDarkGreenBorderActive:
    'var(--token763, var(--token764, var(--token765, var(--colorPaletteDarkGreenBorderActive))))',
  colorPaletteDarkGreenForeground2:
    'var(--token766, var(--token767, var(--token768, var(--colorPaletteDarkGreenForeground2))))',

  // Color palette dark red tokens
  colorPaletteDarkRedBackground2:
    'var(--token769, var(--token770, var(--token771, var(--colorPaletteDarkRedBackground2))))',
  colorPaletteDarkRedBorderActive:
    'var(--token772, var(--token773, var(--token774, var(--colorPaletteDarkRedBorderActive))))',
  colorPaletteDarkRedForeground2:
    'var(--token775, var(--token776, var(--token777, var(--colorPaletteDarkRedForeground2))))',

  // Color palette forest tokens
  colorPaletteForestBackground2:
    'var(--token778, var(--token779, var(--token780, var(--colorPaletteForestBackground2))))',
  colorPaletteForestBorderActive:
    'var(--token781, var(--token782, var(--token783, var(--colorPaletteForestBorderActive))))',
  colorPaletteForestForeground2:
    'var(--token784, var(--token785, var(--token786, var(--colorPaletteForestForeground2))))',

  // Color palette gold tokens
  colorPaletteGoldBackground2: 'var(--token787, var(--token788, var(--token789, var(--colorPaletteGoldBackground2))))',
  colorPaletteGoldBorderActive:
    'var(--token790, var(--token791, var(--token792, var(--colorPaletteGoldBorderActive))))',
  colorPaletteGoldForeground2: 'var(--token793, var(--token794, var(--token795, var(--colorPaletteGoldForeground2))))',

  // Color palette grape tokens
  colorPaletteGrapeBackground2:
    'var(--token796, var(--token797, var(--token798, var(--colorPaletteGrapeBackground2))))',
  colorPaletteGrapeBorderActive:
    'var(--token799, var(--token800, var(--token801, var(--colorPaletteGrapeBorderActive))))',
  colorPaletteGrapeForeground2:
    'var(--token802, var(--token803, var(--token804, var(--colorPaletteGrapeForeground2))))',

  // Color palette lavender tokens
  colorPaletteLavenderBackground2:
    'var(--token805, var(--token806, var(--token807, var(--colorPaletteLavenderBackground2))))',
  colorPaletteLavenderBorderActive:
    'var(--token808, var(--token809, var(--token810, var(--colorPaletteLavenderBorderActive))))',
  colorPaletteLavenderForeground2:
    'var(--token811, var(--token812, var(--token813, var(--colorPaletteLavenderForeground2))))',

  // Color palette light teal tokens
  colorPaletteLightTealBackground2:
    'var(--token814, var(--token815, var(--token816, var(--colorPaletteLightTealBackground2))))',
  colorPaletteLightTealBorderActive:
    'var(--token817, var(--token818, var(--token819, var(--colorPaletteLightTealBorderActive))))',
  colorPaletteLightTealForeground2:
    'var(--token820, var(--token821, var(--token822, var(--colorPaletteLightTealForeground2))))',

  // Color palette lilac tokens
  colorPaletteLilacBackground2:
    'var(--token823, var(--token824, var(--token825, var(--colorPaletteLilacBackground2))))',
  colorPaletteLilacBorderActive:
    'var(--token826, var(--token827, var(--token828, var(--colorPaletteLilacBorderActive))))',
  colorPaletteLilacForeground2:
    'var(--token829, var(--token830, var(--token831, var(--colorPaletteLilacForeground2))))',

  // Color palette magenta tokens
  colorPaletteMagentaBackground2:
    'var(--token832, var(--token833, var(--token834, var(--colorPaletteMagentaBackground2))))',
  colorPaletteMagentaBorderActive:
    'var(--token835, var(--token836, var(--token837, var(--colorPaletteMagentaBorderActive))))',
  colorPaletteMagentaForeground2:
    'var(--token838, var(--token839, var(--token840, var(--colorPaletteMagentaForeground2))))',

  // Color palette mink tokens
  colorPaletteMinkBackground2: 'var(--token841, var(--token842, var(--token843, var(--colorPaletteMinkBackground2))))',
  colorPaletteMinkBorderActive:
    'var(--token844, var(--token845, var(--token846, var(--colorPaletteMinkBorderActive))))',
  colorPaletteMinkForeground2: 'var(--token847, var(--token848, var(--token849, var(--colorPaletteMinkForeground2))))',

  // Color palette navy tokens
  colorPaletteNavyBackground2: 'var(--token850, var(--token851, var(--token852, var(--colorPaletteNavyBackground2))))',
  colorPaletteNavyBorderActive:
    'var(--token853, var(--token854, var(--token855, var(--colorPaletteNavyBorderActive))))',
  colorPaletteNavyForeground2: 'var(--token856, var(--token857, var(--token858, var(--colorPaletteNavyForeground2))))',

  // Color palette peach tokens
  colorPalettePeachBackground2:
    'var(--token859, var(--token860, var(--token861, var(--colorPalettePeachBackground2))))',
  colorPalettePeachBorderActive:
    'var(--token862, var(--token863, var(--token864, var(--colorPalettePeachBorderActive))))',
  colorPalettePeachForeground2:
    'var(--token865, var(--token866, var(--token867, var(--colorPalettePeachForeground2))))',

  // Color palette pink tokens
  colorPalettePinkBackground2: 'var(--token868, var(--token869, var(--token870, var(--colorPalettePinkBackground2))))',
  colorPalettePinkBorderActive:
    'var(--token871, var(--token872, var(--token873, var(--colorPalettePinkBorderActive))))',
  colorPalettePinkForeground2: 'var(--token874, var(--token875, var(--token876, var(--colorPalettePinkForeground2))))',

  // Color palette platinum tokens
  colorPalettePlatinumBackground2:
    'var(--token877, var(--token878, var(--token879, var(--colorPalettePlatinumBackground2))))',
  colorPalettePlatinumBorderActive:
    'var(--token880, var(--token881, var(--token882, var(--colorPalettePlatinumBorderActive))))',
  colorPalettePlatinumForeground2:
    'var(--token883, var(--token884, var(--token885, var(--colorPalettePlatinumForeground2))))',

  // Color palette plum tokens
  colorPalettePlumBackground2: 'var(--token886, var(--token887, var(--token888, var(--colorPalettePlumBackground2))))',
  colorPalettePlumBorderActive:
    'var(--token889, var(--token890, var(--token891, var(--colorPalettePlumBorderActive))))',
  colorPalettePlumForeground2: 'var(--token892, var(--token893, var(--token894, var(--colorPalettePlumForeground2))))',

  // Color palette pumpkin tokens
  colorPalettePumpkinBackground2:
    'var(--token895, var(--token896, var(--token897, var(--colorPalettePumpkinBackground2))))',
  colorPalettePumpkinBorderActive:
    'var(--token898, var(--token899, var(--token900, var(--colorPalettePumpkinBorderActive))))',
  colorPalettePumpkinForeground2:
    'var(--token901, var(--token902, var(--token903, var(--colorPalettePumpkinForeground2))))',

  // Color palette purple tokens
  colorPalettePurpleBackground2:
    'var(--token904, var(--token905, var(--token906, var(--colorPalettePurpleBackground2))))',
  colorPalettePurpleBorderActive:
    'var(--token907, var(--token908, var(--token909, var(--colorPalettePurpleBorderActive))))',
  colorPalettePurpleForeground2:
    'var(--token910, var(--token911, var(--token912, var(--colorPalettePurpleForeground2))))',

  // Color palette royal blue tokens
  colorPaletteRoyalBlueBackground2:
    'var(--token913, var(--token914, var(--token915, var(--colorPaletteRoyalBlueBackground2))))',
  colorPaletteRoyalBlueBorderActive:
    'var(--token916, var(--token917, var(--token918, var(--colorPaletteRoyalBlueBorderActive))))',
  colorPaletteRoyalBlueForeground2:
    'var(--token919, var(--token920, var(--token921, var(--colorPaletteRoyalBlueForeground2))))',

  // Color palette seafoam tokens
  colorPaletteSeafoamBackground2:
    'var(--token922, var(--token923, var(--token924, var(--colorPaletteSeafoamBackground2))))',
  colorPaletteSeafoamBorderActive:
    'var(--token925, var(--token926, var(--token927, var(--colorPaletteSeafoamBorderActive))))',
  colorPaletteSeafoamForeground2:
    'var(--token928, var(--token929, var(--token930, var(--colorPaletteSeafoamForeground2))))',

  // Color palette steel tokens
  colorPaletteSteelBackground2:
    'var(--token931, var(--token932, var(--token933, var(--colorPaletteSteelBackground2))))',
  colorPaletteSteelBorderActive:
    'var(--token934, var(--token935, var(--token936, var(--colorPaletteSteelBorderActive))))',
  colorPaletteSteelForeground2:
    'var(--token937, var(--token938, var(--token939, var(--colorPaletteSteelForeground2))))',

  // Color palette teal tokens
  colorPaletteTealBackground2: 'var(--token940, var(--token941, var(--token942, var(--colorPaletteTealBackground2))))',
  colorPaletteTealBorderActive:
    'var(--token943, var(--token944, var(--token945, var(--colorPaletteTealBorderActive))))',
  colorPaletteTealForeground2: 'var(--token946, var(--token947, var(--token948, var(--colorPaletteTealForeground2))))',

  // Color status success tokens
  colorStatusSuccessBackground1:
    'var(--token949, var(--token950, var(--token951, var(--colorStatusSuccessBackground1))))',
  colorStatusSuccessBackground2:
    'var(--token952, var(--token953, var(--token954, var(--colorStatusSuccessBackground2))))',
  colorStatusSuccessBackground3:
    'var(--token955, var(--token956, var(--token957, var(--colorStatusSuccessBackground3))))',
  colorStatusSuccessForeground1:
    'var(--token958, var(--token959, var(--token960, var(--colorStatusSuccessForeground1))))',
  colorStatusSuccessForeground2:
    'var(--token961, var(--token962, var(--token963, var(--colorStatusSuccessForeground2))))',
  colorStatusSuccessForeground3:
    'var(--token964, var(--token965, var(--token966, var(--colorStatusSuccessForeground3))))',
  colorStatusSuccessForegroundInverted:
    'var(--token967, var(--token968, var(--token969, var(--colorStatusSuccessForegroundInverted))))',
  colorStatusSuccessBorderActive:
    'var(--token970, var(--token971, var(--token972, var(--colorStatusSuccessBorderActive))))',
  colorStatusSuccessBorder1: 'var(--token973, var(--token974, var(--token975, var(--colorStatusSuccessBorder1))))',
  colorStatusSuccessBorder2: 'var(--token976, var(--token977, var(--token978, var(--colorStatusSuccessBorder2))))',

  // Color status warning tokens
  colorStatusWarningBackground1:
    'var(--token979, var(--token980, var(--token981, var(--colorStatusWarningBackground1))))',
  colorStatusWarningBackground2:
    'var(--token982, var(--token983, var(--token984, var(--colorStatusWarningBackground2))))',
  colorStatusWarningBackground3:
    'var(--token985, var(--token986, var(--token987, var(--colorStatusWarningBackground3))))',
  colorStatusWarningForeground1:
    'var(--token988, var(--token989, var(--token990, var(--colorStatusWarningForeground1))))',
  colorStatusWarningForeground2:
    'var(--token991, var(--token992, var(--token993, var(--colorStatusWarningForeground2))))',
  colorStatusWarningForeground3:
    'var(--token994, var(--token995, var(--token996, var(--colorStatusWarningForeground3))))',
  colorStatusWarningForegroundInverted:
    'var(--token997, var(--token998, var(--token999, var(--colorStatusWarningForegroundInverted))))',
  colorStatusWarningBorderActive:
    'var(--token1000, var(--token1001, var(--token1002, var(--colorStatusWarningBorderActive))))',
  colorStatusWarningBorder1: 'var(--token1003, var(--token1004, var(--token1005, var(--colorStatusWarningBorder1))))',
  colorStatusWarningBorder2: 'var(--token1006, var(--token1007, var(--token1008, var(--colorStatusWarningBorder2))))',

  // Color status danger tokens
  colorStatusDangerBackground1:
    'var(--token1009, var(--token1010, var(--token1011, var(--colorStatusDangerBackground1))))',
  colorStatusDangerBackground2:
    'var(--token1012, var(--token1013, var(--token1014, var(--colorStatusDangerBackground2))))',
  colorStatusDangerBackground3:
    'var(--token1015, var(--token1016, var(--token1017, var(--colorStatusDangerBackground3))))',
  colorStatusDangerBackground3Hover:
    'var(--token1018, var(--token1019, var(--token1020, var(--colorStatusDangerBackground3Hover))))',
  colorStatusDangerBackground3Pressed:
    'var(--token1021, var(--token1022, var(--token1023, var(--colorStatusDangerBackground3Pressed))))',
  colorStatusDangerForeground1:
    'var(--token1024, var(--token1025, var(--token1026, var(--colorStatusDangerForeground1))))',
  colorStatusDangerForeground2:
    'var(--token1027, var(--token1028, var(--token1029, var(--colorStatusDangerForeground2))))',
  colorStatusDangerForeground3:
    'var(--token1030, var(--token1031, var(--token1032, var(--colorStatusDangerForeground3))))',
  colorStatusDangerForegroundInverted:
    'var(--token1033, var(--token1034, var(--token1035, var(--colorStatusDangerForegroundInverted))))',
  colorStatusDangerBorderActive:
    'var(--token1036, var(--token1037, var(--token1038, var(--colorStatusDangerBorderActive))))',
  colorStatusDangerBorder1: 'var(--token1039, var(--token1040, var(--token1041, var(--colorStatusDangerBorder1))))',
  colorStatusDangerBorder2: 'var(--token1042, var(--token1043, var(--token1044, var(--colorStatusDangerBorder2))))',

  // Border radius tokens
  borderRadiusNone: 'var(--token1045, var(--token1046, var(--token1047, var(--borderRadiusNone))))',
  borderRadiusSmall: 'var(--token1048, var(--token1049, var(--token1050, var(--borderRadiusSmall))))',
  borderRadiusMedium: 'var(--token1051, var(--token1052, var(--token1053, var(--borderRadiusMedium))))',
  borderRadiusLarge: 'var(--token1054, var(--token1055, var(--token1056, var(--borderRadiusLarge))))',
  borderRadiusXLarge: 'var(--token1057, var(--token1058, var(--token1059, var(--borderRadiusXLarge))))',
  borderRadiusCircular: 'var(--token1060, var(--token1061, var(--token1062, var(--borderRadiusCircular))))',

  // Font family tokens
  fontFamilyBase: 'var(--token1063, var(--token1064, var(--token1065, var(--fontFamilyBase))))',
  fontFamilyMonospace: 'var(--token1066, var(--token1067, var(--token1068, var(--fontFamilyMonospace))))',
  fontFamilyNumeric: 'var(--token1069, var(--token1070, var(--token1071, var(--fontFamilyNumeric))))',

  // Font size tokens
  fontSizeBase100: 'var(--token1072, var(--token1073, var(--token1074, var(--fontSizeBase100))))',
  fontSizeBase200: 'var(--token1075, var(--token1076, var(--token1077, var(--fontSizeBase200))))',
  fontSizeBase300: 'var(--token1078, var(--token1079, var(--token1080, var(--fontSizeBase300))))',
  fontSizeBase400: 'var(--token1081, var(--token1082, var(--token1083, var(--fontSizeBase400))))',
  fontSizeBase500: 'var(--token1084, var(--token1085, var(--token1086, var(--fontSizeBase500))))',
  fontSizeBase600: 'var(--token1087, var(--token1088, var(--token1089, var(--fontSizeBase600))))',
  fontSizeHero700: 'var(--token1090, var(--token1091, var(--token1092, var(--fontSizeHero700))))',
  fontSizeHero800: 'var(--token1093, var(--token1094, var(--token1095, var(--fontSizeHero800))))',
  fontSizeHero900: 'var(--token1096, var(--token1097, var(--token1098, var(--fontSizeHero900))))',
  fontSizeHero1000: 'var(--token1099, var(--token1100, var(--token1101, var(--fontSizeHero1000))))',

  // Font weight tokens
  fontWeightRegular: 'var(--token1102, var(--token1103, var(--token1104, var(--fontWeightRegular))))',
  fontWeightMedium: 'var(--token1105, var(--token1106, var(--token1107, var(--fontWeightMedium))))',
  fontWeightSemibold: 'var(--token1108, var(--token1109, var(--token1110, var(--fontWeightSemibold))))',
  fontWeightBold: 'var(--token1111, var(--token1112, var(--token1113, var(--fontWeightBold))))',

  // Line height tokens
  lineHeightBase100: 'var(--token1114, var(--token1115, var(--token1116, var(--lineHeightBase100))))',
  lineHeightBase200: 'var(--token1117, var(--token1118, var(--token1119, var(--lineHeightBase200))))',
  lineHeightBase300: 'var(--token1120, var(--token1121, var(--token1122, var(--lineHeightBase300))))',
  lineHeightBase400: 'var(--token1123, var(--token1124, var(--token1125, var(--lineHeightBase400))))',
  lineHeightBase500: 'var(--token1126, var(--token1127, var(--token1128, var(--lineHeightBase500))))',
  lineHeightBase600: 'var(--token1129, var(--token1130, var(--token1131, var(--lineHeightBase600))))',
  lineHeightHero700: 'var(--token1132, var(--token1133, var(--token1134, var(--lineHeightHero700))))',
  lineHeightHero800: 'var(--token1135, var(--token1136, var(--token1137, var(--lineHeightHero800))))',
  lineHeightHero900: 'var(--token1138, var(--token1139, var(--token1140, var(--lineHeightHero900))))',
  lineHeightHero1000: 'var(--token1141, var(--token1142, var(--token1143, var(--lineHeightHero1000))))',

  // Shadow tokens
  shadow2: 'var(--token1144, var(--token1145, var(--token1146, var(--shadow2))))',
  shadow4: 'var(--token1147, var(--token1148, var(--token1149, var(--shadow4))))',
  shadow8: 'var(--token1150, var(--token1151, var(--token1152, var(--shadow8))))',
  shadow16: 'var(--token1153, var(--token1154, var(--token1155, var(--shadow16))))',
  shadow28: 'var(--token1156, var(--token1157, var(--token1158, var(--shadow28))))',
  shadow64: 'var(--token1159, var(--token1160, var(--token1161, var(--shadow64))))',

  // Shadow brand tokens
  shadow2Brand: 'var(--token1162, var(--token1163, var(--token1164, var(--shadow2Brand))))',
  shadow4Brand: 'var(--token1165, var(--token1166, var(--token1167, var(--shadow4Brand))))',
  shadow8Brand: 'var(--token1168, var(--token1169, var(--token1170, var(--shadow8Brand))))',
  shadow16Brand: 'var(--token1171, var(--token1172, var(--token1173, var(--shadow16Brand))))',
  shadow28Brand: 'var(--token1174, var(--token1175, var(--token1176, var(--shadow28Brand))))',
  shadow64Brand: 'var(--token1177, var(--token1178, var(--token1179, var(--shadow64Brand))))',

  // Stroke width tokens
  strokeWidthThin: 'var(--token1180, var(--token1181, var(--token1182, var(--strokeWidthThin))))',
  strokeWidthThick: 'var(--token1183, var(--token1184, var(--token1185, var(--strokeWidthThick))))',
  strokeWidthThicker: 'var(--token1186, var(--token1187, var(--token1188, var(--strokeWidthThicker))))',
  strokeWidthThickest: 'var(--token1189, var(--token1190, var(--token1191, var(--strokeWidthThickest))))',

  // Spacings
  spacingHorizontalNone: 'var(--token1192, var(--token1193, var(--token1194, var(--spacingHorizontalNone))))',
  spacingHorizontalXXS: 'var(--token1195, var(--token1196, var(--token1197, var(--spacingHorizontalXXS))))',
  spacingHorizontalXS: 'var(--token1198, var(--token1199, var(--token1200, var(--spacingHorizontalXS))))',
  spacingHorizontalSNudge: 'var(--token1201, var(--token1202, var(--token1203, var(--spacingHorizontalSNudge))))',
  spacingHorizontalS: 'var(--token1204, var(--token1205, var(--token1206, var(--spacingHorizontalS))))',
  spacingHorizontalMNudge: 'var(--token1207, var(--token1208, var(--token1209, var(--spacingHorizontalMNudge))))',
  spacingHorizontalM: 'var(--token1210, var(--token1211, var(--token1212, var(--spacingHorizontalM))))',
  spacingHorizontalL: 'var(--token1213, var(--token1214, var(--token1215, var(--spacingHorizontalL))))',
  spacingHorizontalXL: 'var(--token1216, var(--token1217, var(--token1218, var(--spacingHorizontalXL))))',
  spacingHorizontalXXL: 'var(--token1219, var(--token1220, var(--token1221, var(--spacingHorizontalXXL))))',
  spacingHorizontalXXXL: 'var(--token1222, var(--token1223, var(--token1224, var(--spacingHorizontalXXXL))))',

  spacingVerticalNone: 'var(--token1225, var(--token1226, var(--token1227, var(--spacingVerticalNone))))',
  spacingVerticalXXS: 'var(--token1228, var(--token1229, var(--token1230, var(--spacingVerticalXXS))))',
  spacingVerticalXS: 'var(--token1231, var(--token1232, var(--token1233, var(--spacingVerticalXS))))',
  spacingVerticalSNudge: 'var(--token1234, var(--token1235, var(--token1236, var(--spacingVerticalSNudge))))',
  spacingVerticalS: 'var(--token1237, var(--token1238, var(--token1239, var(--spacingVerticalS))))',
  spacingVerticalMNudge: 'var(--token1240, var(--token1241, var(--token1242, var(--spacingVerticalMNudge))))',
  spacingVerticalM: 'var(--token1243, var(--token1244, var(--token1245, var(--spacingVerticalM))))',
  spacingVerticalL: 'var(--token1246, var(--token1247, var(--token1248, var(--spacingVerticalL))))',
  spacingVerticalXL: 'var(--token1249, var(--token1250, var(--token1251, var(--spacingVerticalXL))))',
  spacingVerticalXXL: 'var(--token1252, var(--token1253, var(--token1254, var(--spacingVerticalXXL))))',
  spacingVerticalXXXL: 'var(--token1255, var(--token1256, var(--token1257, var(--spacingVerticalXXXL))))',

  // Durations
  durationUltraFast: 'var(--token1258, var(--token1259, var(--token1260, var(--durationUltraFast))))',
  durationFaster: 'var(--token1261, var(--token1262, var(--token1263, var(--durationFaster))))',
  durationFast: 'var(--token1264, var(--token1265, var(--token1266, var(--durationFast))))',
  durationNormal: 'var(--token1267, var(--token1268, var(--token1269, var(--durationNormal))))',
  durationGentle: 'var(--token1270, var(--token1271, var(--token1272, var(--durationGentle))))',
  durationSlow: 'var(--token1273, var(--token1274, var(--token1275, var(--durationSlow))))',
  durationSlower: 'var(--token1276, var(--token1277, var(--token1278, var(--durationSlower))))',
  durationUltraSlow: 'var(--token1279, var(--token1280, var(--token1281, var(--durationUltraSlow))))',

  // Curves
  curveAccelerateMax: 'var(--token1282, var(--token1283, var(--token1284, var(--curveAccelerateMax))))',
  curveAccelerateMid: 'var(--token1285, var(--token1286, var(--token1287, var(--curveAccelerateMid))))',
  curveAccelerateMin: 'var(--token1288, var(--token1289, var(--token1290, var(--curveAccelerateMin))))',
  curveDecelerateMax: 'var(--token1291, var(--token1292, var(--token1293, var(--curveDecelerateMax))))',
  curveDecelerateMid: 'var(--token1294, var(--token1295, var(--token1296, var(--curveDecelerateMid))))',
  curveDecelerateMin: 'var(--token1297, var(--token1298, var(--token1299, var(--curveDecelerateMin))))',
  curveEasyEaseMax: 'var(--token1300, var(--token1301, var(--token1302, var(--curveEasyEaseMax))))',
  curveEasyEase: 'var(--token1303, var(--token1304, var(--token1305, var(--curveEasyEase))))',
  curveLinear: 'var(--token1306, var(--token1307, var(--token1308, var(--curveLinear))))',
};
