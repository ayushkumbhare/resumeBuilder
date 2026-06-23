import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData, StyleOptions } from '../types';

const createStyles = (styles: StyleOptions) => {
  const primaryColor = styles.primaryColor || '#0F2A4A';
  const accentColor = styles.accentColor || '#60a5fa';
  const bodySize = (styles.bodyFontSize || 9.5) + (styles.globalFontScale || 0);
  const headingSize = (styles.headingSize || 12) + (styles.globalFontScale || 0);
  const nameSize = (styles.nameSize || 22) + (styles.globalFontScale || 0);
  const lineHeight = styles.lineHeight || 1.4;
  const sectionSpacing = (styles.sectionSpacing ?? 10) * 0.5;
  const docMargin = styles.documentMargin || 10;

  return StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      fontFamily: 'Helvetica',
      fontSize: bodySize,
      color: '#374151',
      lineHeight: lineHeight,
    },
    sidebar: {
      width: '68mm',
      backgroundColor: primaryColor,
      color: '#ffffff',
      paddingTop: `${docMargin}mm`,
      paddingBottom: `${docMargin}mm`,
      paddingLeft: '7mm',
      paddingRight: '7mm',
      flexDirection: 'column',
    },
    sidebarSection: {
      marginBottom: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
    },
    sidebarNameWrap: {
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255,255,255,0.15)',
      marginBottom: 14,
    },
    name: {
      fontSize: nameSize,
      fontFamily: 'Helvetica-Bold',
      color: '#ffffff',
      lineHeight: 1.05,
      letterSpacing: -0.3,
    },
    nameLast: {
      color: accentColor,
    },
    headline: {
      fontSize: bodySize,
      color: 'rgba(255,255,255,0.6)',
      marginTop: 5,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    sidebarTitle: {
      fontSize: headingSize,
      textTransform: 'uppercase',
      letterSpacing: 1.2,
      color: accentColor,
      fontFamily: 'Helvetica-Bold',
      paddingBottom: 4,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255,255,255,0.1)',
      marginBottom: 4,
    },
    contactItem: {
      marginBottom: 6,
    },
    ciLabel: {
      fontSize: bodySize,
      color: 'rgba(255,255,255,0.4)',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 1,
    },
    ciValue: {
      color: 'rgba(255,255,255,0.85)',
    },
    skillItem: {
      marginBottom: 6,
    },
    skillCat: {
      fontFamily: 'Helvetica-Bold',
      color: 'rgba(255,255,255,0.9)',
      marginBottom: 1,
    },
    skillVal: {
      color: 'rgba(255,255,255,0.55)',
    },
    eduItem: {
      marginBottom: 8,
    },
    eduDegree: {
      fontFamily: 'Helvetica-Bold',
      color: 'rgba(255,255,255,0.9)',
    },
    eduInst: {
      color: 'rgba(255,255,255,0.55)',
      marginTop: 1,
    },
    eduPeriod: {
      color: 'rgba(255,255,255,0.35)',
      marginTop: 1,
    },
    main: {
      flex: 1,
      paddingTop: `${docMargin}mm`,
      paddingBottom: `${docMargin}mm`,
      paddingLeft: '9mm',
      paddingRight: '9mm',
    },
    section: {
      marginBottom: sectionSpacing,
    },
    sectionTitle: {
      fontSize: (styles.headingSize || 9.5) + (styles.globalFontScale || 0),
      fontFamily: 'Helvetica-Bold',
      textTransform: 'uppercase',
      letterSpacing: 1,
      color: primaryColor,
      borderBottomWidth: 2,
      borderBottomColor: accentColor,
      paddingBottom: 2,
      marginBottom: 5,
    },
    body: {
      color: '#374151',
    },
    expItem: {
      marginBottom: 8,
    },
    expHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    expCompany: {
      fontFamily: 'Helvetica-Bold',
      color: '#111827',
    },
    expMeta: {
      color: '#6b7280',
    },
    expPeriod: {
      color: '#6b7280',
    },
    expTitle: {
      fontFamily: 'Helvetica-Bold',
      color: primaryColor,
      marginTop: 1,
      marginBottom: 3,
    },
    bullets: {
      paddingLeft: 13,
      marginTop: 3,
    },
    bulletItem: {
      flexDirection: 'row',
      marginBottom: 1.5,
    },
    bulletPoint: {
      width: 10,
    },
    bulletText: {
      flex: 1,
    },
    subheadingText: {
      fontFamily: 'Helvetica-Bold',
      marginTop: 2,
      marginBottom: 1,
    }
  });
};

interface SlatePdfProps {
  data: ResumeData;
  styles: StyleOptions;
}

export function SlatePdf({ data, styles }: SlatePdfProps) {
  const s = createStyles(styles);
  const pi = data.personalInfo;

  const renderName = () => {
    const parts = pi.name.split(' ');
    if (parts.length > 1) {
      const last = parts.pop();
      return (
        <Text style={s.name}>
          {parts.join(' ')} <Text style={s.nameLast}>{last}</Text>
        </Text>
      );
    }
    return <Text style={s.name}>{pi.name || 'Your Name'}</Text>;
  };

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.sidebar}>
          <View style={s.sidebarNameWrap}>
            {renderName()}
            {pi.headline && <Text style={s.headline}>{pi.headline}</Text>}
          </View>

          <View style={s.sidebarSection}>
            <Text style={s.sidebarTitle}>Contact</Text>
            {['phone', 'email', 'location', 'linkedin', 'github', 'website']
              .filter(f => (pi as any)[f])
              .map(f => (
                <View key={f} style={s.contactItem}>
                  <Text style={s.ciLabel}>{f}</Text>
                  <Text style={s.ciValue}>{(pi as any)[f]}</Text>
                </View>
              ))}
          </View>

          {data.skills.filter(sk => sk.visible).length > 0 && (
            <View style={s.sidebarSection}>
              <Text style={s.sidebarTitle}>Skills</Text>
              {data.skills.filter(sk => sk.visible).map(sk => (
                <View key={sk.id} style={s.skillItem}>
                  <Text style={s.skillCat}>{sk.category}</Text>
                  <Text style={s.skillVal}>{sk.items}</Text>
                </View>
              ))}
            </View>
          )}

          {data.education.filter(e => e.visible).length > 0 && (
            <View style={s.sidebarSection}>
              <Text style={s.sidebarTitle}>Education</Text>
              {data.education.filter(e => e.visible).map(edu => (
                <View key={edu.id} style={s.eduItem}>
                  <Text style={s.eduDegree}>{edu.degree}</Text>
                  <Text style={s.eduInst}>{edu.institution}</Text>
                  <Text style={s.eduPeriod}>{edu.period}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={s.main}>
          {pi.summary && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>Profile</Text>
              <Text style={s.body}>{pi.summary}</Text>
            </View>
          )}

          {data.experience.filter(e => e.visible).length > 0 && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>Experience</Text>
              {data.experience.filter(e => e.visible).map(exp => (
                <View key={exp.id} style={s.expItem}>
                  <View style={s.expHeader}>
                    <Text style={s.expCompany}>
                      {exp.company}
                      {exp.location && <Text style={s.expMeta}> — {exp.location}</Text>}
                    </Text>
                    <Text style={s.expPeriod}>{exp.period}</Text>
                  </View>
                  {exp.title && <Text style={s.expTitle}>{exp.title}</Text>}
                  <View style={s.bullets}>
                    {exp.bullets.filter(b => b.visible).map(b => (
                      b.isSubheading ? (
                        <Text key={b.id} style={s.subheadingText}>{b.text}</Text>
                      ) : (
                        <View key={b.id} style={s.bulletItem}>
                          <Text style={s.bulletPoint}>•</Text>
                          <Text style={s.bulletText}>{b.text}</Text>
                        </View>
                      )
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {data.projects.filter(p => p.visible).length > 0 && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>Projects</Text>
              {data.projects.filter(p => p.visible).map(proj => (
                <View key={proj.id} style={s.expItem}>
                  <View style={s.expHeader}>
                    <Text style={s.expCompany}>
                      {proj.title}
                      {proj.subtitle && <Text style={s.expMeta}> — {proj.subtitle}</Text>}
                    </Text>
                  </View>
                  <View style={s.bullets}>
                    {proj.bullets.filter(b => b.visible).map(b => (
                      b.isSubheading ? (
                        <Text key={b.id} style={s.subheadingText}>{b.text}</Text>
                      ) : (
                        <View key={b.id} style={s.bulletItem}>
                          <Text style={s.bulletPoint}>•</Text>
                          <Text style={s.bulletText}>{b.text}</Text>
                        </View>
                      )
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {data.responsibilities.filter(r => r.visible).length > 0 && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>Responsibility</Text>
              <View style={s.bullets}>
                {data.responsibilities.filter(r => r.visible).map(r => (
                  <View key={r.id} style={s.bulletItem}>
                    <Text style={s.bulletPoint}>•</Text>
                    <Text style={s.bulletText}>{r.text}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
